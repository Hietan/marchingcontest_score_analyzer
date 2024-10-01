table_outer = document.getElementsByTagName("table")[0];
table_outer.removeAttribute("width");

tables = table_outer.getElementsByTagName("table");
Array.from(tables).forEach(table => {
	table.removeAttribute("width");
	trs = table.getElementsByTagName("tr");
	Array.from(trs).slice(1).forEach(tr => {
		name = tr.getElementsByTagName("td")[4].innerText;
		console.log(name);
	});
});
