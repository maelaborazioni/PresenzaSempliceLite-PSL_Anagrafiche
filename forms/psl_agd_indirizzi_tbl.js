
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E6227A54-96DD-40C8-91D4-4859C3397802"}
 */
function onAction$btn_recapiti(event) 
{
	globals.apriElencoRecapitiIndirizzoDitta(event, forms.psl_agd_recapiti_tbl.controller.getName());
}
