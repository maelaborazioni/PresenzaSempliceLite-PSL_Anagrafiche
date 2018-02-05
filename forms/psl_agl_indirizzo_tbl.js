/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4BF12CB9-9140-4ED2-947A-FF413C0B3D3F"}
 */
function apriElencoRecapitiPersona(event) 
{
	globals.ma_utl_showFormInDialog(forms.psl_agp_recapiti_tbl.controller.getName(), 'Elenco recapiti', persone_domicili_to_persone_recapiti, false, -1, 200);
}