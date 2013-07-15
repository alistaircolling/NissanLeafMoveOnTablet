$(function() {
	var div = $("#comps").get(0);

	new mc.VSlider(div, 10, 10)
		.bindLabel(new mc.Label(div, 15, 125).setAlign("center"), 0);

	new mc.HSlider(div, 30, 10)
		.bindLabel(new mc.Label(div, 145, 10), 0);

	new mc.RadioButton(div, 30, 30, "Option 1");
	new mc.RadioButton(div, 30, 45, "Option 2");
	new mc.RadioButton(div, 30, 60, "Option 3");
	new mc.RadioButton(div, 30, 75, "Option 4");

	new mc.CheckBox(div, 100, 30, "Check 1");
	new mc.CheckBox(div, 100, 45, "Check 2");
	new mc.CheckBox(div, 100, 60, "Check 3");
	new mc.CheckBox(div, 100, 75, "Check 4");

	new mc.Label(div, 170, 10, "Enter name:");
	new mc.InputText(div, 235, 7);

	new mc.Pushbutton(div, 170, 40, "Click me!");
});