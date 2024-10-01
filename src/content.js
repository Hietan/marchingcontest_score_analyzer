async function main() {
	const currentUrl = window.location.href;
	let division;
	if (currentUrl.includes('koukou')) {
		division = "高等学校";
	}
	else if (currentUrl.includes('junior')) {
		division = "中学校";
	}

	const jsonUrl = chrome.runtime.getURL("src/results.json");
	const response = await fetch(jsonUrl);
	const data = await response.json();

	const table_outer = document.getElementsByTagName("table")[0];
	table_outer.removeAttribute("width");

	const tables = table_outer.getElementsByTagName("table");
	Array.from(tables).forEach(table => {
		table.removeAttribute("width");
		const trs = table.getElementsByTagName("tr");

		const header = trs[0];
		for (const year of data["years"]) {
			const td = document.createElement("td");
			td.align = "center";
			td.height = "2";
			const font = document.createElement("font");
			font.size = "2"
			const b = document.createElement("b");
			b.innerText = year;
			font.appendChild(b);
			td.appendChild(font);
			header.appendChild(td);
		}

		const data_div = data[division];
		Array.from(trs).slice(1).forEach(tr => {
			const name = tr.getElementsByTagName("td")[4].innerText;
			if (name in data_div) {
				for (const year of data["years"]) {
					let award = "";
					if (year in data_div[name]["賞"]) {
						award = data_div[name]["賞"][year];
					}
					const td = document.createElement("td");
					td.height = "1";
					td.align = "center";
					const span = document.createElement("span");
					switch(award) {
						case "金":
							span.style.color = "#ff0000";
							break;
						case "銀":
							span.style.color = "#0000ff";
							break;
						case "銅":
							span.style.color = "#000000";
							break;
					}
					const font = document.createElement("font");
					font.size = "2";
					font.innerText = award;
					span.appendChild(font);
					td.appendChild(span);
					tr.appendChild(td);
				}
			}
			else {
				for (const year in data["years"]) {
					const td = document.createElement("td");
					tr.appendChild(td);
				}
			}
		});
	});
}

main();
