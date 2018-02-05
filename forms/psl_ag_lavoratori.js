/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E016CABE-A703-42D1-8D7B-0CA47491105D",variableType:4}
 */
var v_loop_on_lavoratori = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"01F7F7A0-CEAA-4666-8F90-D555BB6859A2",variableType:4}
 */
var v_includi_cessati = 0;

/**
 * @properties={typeid:24,uuid:"CC3006DF-80D2-418E-9DD2-C431DBFC3A22"}
 */
function init()
{
	if(!v_includi_cessati)
		filterLavoratori(foundset);
	else
		foundset.loadAllRecords();
	
	foundset.sort('lavoratori_to_persone.nominativo asc, codice asc');
	getNavigator().init();
	
	controller.readOnly = false;
	elements.detail_tab.readOnly = true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0038B376-917D-4D88-AB50-F721F0F047A6"}
 */
function onAction$lbl_lavoratore(event) 
{
	showMenuLavoratore(event);
}

/**
 * @properties={typeid:24,uuid:"1103B89E-534F-4ECB-AFFC-FAA58E939DBA"}
 */
function showMenuLavoratore(event)
{
	var menu = plugins.window.createPopupMenu();
	for(var r = 1; r <= foundset.getSize(); r++)
	{
		var record = foundset.getRecord(r);
		var item = menu.addMenuItem(scopes.utl.PadRight(record.codice.toString(), 5) + ' - ' + record.nominativo_qualifica);
			item.setMethod(gotoLavoratoreFromMenu, [r]);
			
		if(record.cessazione && record.cessazione <= globals.TODAY)
			item.text += ' (C)';
		
		if(r == foundset.getSelectedIndex())
			item.selected = true;
	}
	
	menu.show(event.getSource());
}

/**
 * @properties={typeid:24,uuid:"6C1DAAA3-1A5F-4FBB-A5B2-23B3C31ABEC9"}
 */
function gotoNextLavoratore()
{
	var nextIndex = foundset.getSelectedIndex() + 1;
	if(foundset.getSelectedIndex() > foundset.getSize())
	{
		if(loopOnLavoratori())
			nextIndex = 1;
		else
			return;
	}
	
	gotoLavoratore(nextIndex);
}

/**
 * @param index
 *
 * @properties={typeid:24,uuid:"B5ECB00D-240B-4CDE-9459-76C3F6E14A01"}
 */
function gotoLavoratore(index)
{
	foundset.setSelectedIndex(index);
}

/**
 * @properties={typeid:24,uuid:"6CACE366-0964-41B9-9477-E49E802121AD"}
 */
function gotoPreviousLavoratore()
{
	var prevIndex = foundset.getSelectedIndex() - 1;
	if(foundset.getSelectedIndex() == 1)
	{
		if(loopOnLavoratori())
			prevIndex = foundset.getSize();
		else
			return;
	}

	gotoLavoratore(prevIndex);
}

/**
 * @properties={typeid:24,uuid:"53C6547E-0E1E-4592-A9E7-97CF838A51D7"}
 */
function gotoLavoratoreFromMenu(_a, _b, _c, _d, _e, index)
{
	gotoLavoratore(index);
}

/**
 * @properties={typeid:24,uuid:"CEE3AB60-EF48-4BF0-A06E-74081D457994"}
 */
function next_record()
{
	gotoNextLavoratore();
}

/**
 * @properties={typeid:24,uuid:"0047DF46-DDA5-43AD-979C-0F6B693BAFEE"}
 */
function previous_record()
{
	gotoPreviousLavoratore();
}

/**
 * @return {RuntimeForm<default_navigator>}
 * 
 * @properties={typeid:24,uuid:"F7B3BC6B-41B1-43B1-8D31-49B5C02F560E"}
 */
function getNavigator()
{
	/** @type {RuntimeForm<default_navigator>} */
	var form = forms[elements.tab_navigator.getTabFormNameAt(1)];
	return form;
}

/**
 * @properties={typeid:24,uuid:"E97807F9-9626-410E-8FE8-43AB729C0AEF"}
 */
function loopOnLavoratori()
{
	return v_loop_on_lavoratori === 1;
}
/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"47535F46-13D8-4C92-ABBD-3F11A67EC92F"}
 * @AllowToRunInFind
 */
function onDataChange$chk_cessati(oldValue, newValue, event) 
{
	var fs = foundset;
	if(!newValue)
		filterLavoratori(fs);
	else
		fs.loadAllRecords();
	
	fs.sort('lavoratori_to_persone.nominativo asc, codice asc');
	getNavigator().init();
		
	return true;
}

/**
 * @AllowToRunInFind
 * 
 * @properties={typeid:24,uuid:"095F5CDA-4F7A-437E-BE64-DDFE91F2F156"}
 */
function filterLavoratori(fs)
{
	if(!fs || !fs.find())
		throw new Error('i18n:ma.err.findmode');
	
	fs.cessazione = '^||' + globals.ComparisonOperator.GE + globals.formatForFind(globals.TODAY);
	fs.search();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FF4CA767-F33C-468C-9213-96EB6F1517BF"}
 */
function onAction$lbl_cessati(event) 
{
	var oldValue = v_includi_cessati;
	var newValue = v_includi_cessati = 1 - v_includi_cessati;
	
	onDataChange$chk_cessati(oldValue, newValue, event);
}
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CDFDBFDF-BE53-4C8F-8900-81F7D4A9C26A"}
 */
function onRecordSelection(event) 
{
	getNavigator().updateIndex();
}
