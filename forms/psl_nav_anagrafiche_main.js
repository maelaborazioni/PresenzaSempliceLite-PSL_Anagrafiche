/**
 * @properties={typeid:24,uuid:"A018F295-16F6-42A2-9964-59EA0116BDF8"}
 */
function getName()
{
	return scopes.psl.Sezioni.ANAGRAFICHE;
}

/**
 * @param tab
 *
 * @properties={typeid:24,uuid:"A17E621B-1014-4EB7-88B3-61182B7750CF"}
 */
function open(tab)
{
	foundset.loadAllRecords();
	forms.psl_ag_anagrafiche.open(tab);
}