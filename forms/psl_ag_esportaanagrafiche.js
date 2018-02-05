/**
 * @param event
 *
 * @properties={typeid:24,uuid:"F4418312-36D2-4715-8031-9B92E73A28C9"}
 */
function onActionBtnOk(event)
{
	forms.psl_nav_anagrafiche.disable();
	forms.psl_status_bar.setStatusWarning('Esportazione in corso, attendere...');
	
	try
	{
		var parameters =
		{
			pidditta					:	vEmployerID,
			palladata					:	vDateTo,
			pelencodipendenti			:	vEmployeesIDs === null || vEmployeesIDs.length > 0 ? vEmployeesIDs : [vEmployeesIDs],
			pesportadatianagrafici		:	vExportPersonalData === 1,
			pesportaaltridatianagrafici	:	vExportOtherPersonalData === 1,
			pesportariferimenti			:	vExportContactsData === 1,
			pesportadocumenti			:	vExportDocumentsData === 1,
			pesportainail				:	vExportInailData === 1,
			pesportarapportolavoro		:	vExportContractData === 1,
			pesportaclassificazioni		:	vExportClassificationsData === 1,
			pstampacopertina			:	vPrintSummary === 1
		}
		
		var report = plugins.jasperPluginRMI.runReport(globals.getSwitchedServer(globals.Server.MA_ANAGRAFICHE),'hr_anagraficadipendenti.jasper',null,plugins.jasperPluginRMI.OUTPUT_FORMAT.PDF,parameters)
		if(!report)
				throw new Error('Errore durante la creazione della stampa');
			
		/**
		 * Save the generated print
		 */
		if(!plugins.file.writeFile([['AnagraficaDipendenti', vEmployerName, utils.dateFormat(vDateTo,globals.ISO_DATEFORMAT)].join('_'),'pdf'].join('.'),report))
			throw new Error('Errore durante il salvataggio del file');
							 
	//	scopes.psl.RunJob({ method: _super.onActionBtnOk, args: [event], sync: true, start_message: 'i18n:ma.msg.export_data' });
	//	forms.psl_nav_anagrafiche.enable(true);
		
		forms.psl_status_bar.resetStatus();
	
	//	scopes.psl.showStoricoOperazioni(true);
	}
	catch(ex)
	{
		forms.psl_status_bar.setStatusError('Errore durante l\'esportazione dei dati','',4000);
	}
	finally
	{
		forms.psl_nav_anagrafiche.enable(true);
	}
}
/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9B6B6BE2-6500-499F-BC33-BB3CDFFAB7D1"}
 */
function onLoad(event)
{
	foundset.loadAllRecords();
	updateEmployer(foundset.getSelectedRecord());
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"46E7C8B5-6D4B-48B1-AFC3-9D950CB6F561"}
 */
function onRecordSelection(event) 
{	
	updateEmployer(foundset.getSelectedRecord());
}
