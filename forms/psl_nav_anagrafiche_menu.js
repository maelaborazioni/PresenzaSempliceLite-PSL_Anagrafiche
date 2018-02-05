/**
 * @properties={typeid:24,uuid:"282FDFB6-203D-4BD4-9000-39579DE09F2D"}
 */
function getParentMenu()
{
	return forms.psl_nav_anagrafiche;
}

/**
 * @param jsForm
 * @param sezione
 *
 * @properties={typeid:24,uuid:"F3B1C0FE-3DCE-4619-85A8-BCAF8B1978CF"}
 */
function getMenuItemOnAction(jsForm, sezione)
{
	var method = jsForm.newMethod(
	"function onAction$" + sezione.nome + "(event){\
		openSection('" + sezione.nome + "');\
	 }");

	return method;
}

/**
 * @param section
 *
 * @properties={typeid:24,uuid:"DB093609-50D9-431E-A6B4-75181BC155C2"}
 */
function openSection(section)
{
	getParentMenu().openDataSection();
	forms.psl_nav_anagrafiche_main.open(section);
}