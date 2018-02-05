/**
 * @param tab
 *
 * @properties={typeid:24,uuid:"B2A9C55F-FD13-4E69-A522-B5762B547332"}
 */
function open(tab)
{
	elements.container_tab.tabIndex = tab;
}
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E5246560-C65C-4B3A-BE69-8F8BD872C810"}
 */
function onRecordSelection(event) 
{
	forms.psl_ag_ditta.init();
	if(elements.container_tab.getTabNameAt(elements.container_tab.tabIndex) == 'esportalavoratori')
	   return;
	forms.psl_ag_lavoratori.init();
}