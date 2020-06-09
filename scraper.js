const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');
var fs = require('fs');
//process file
var array = fs.readFileSync('process list').toString().split("\n")
clipboardy.writeSync('ðŸ¦„');
	
const writeStream = fs.createWriteStream('scraper.csv');

const unique_app_name_3 = 'NULL'
// write some data with a base64 encoding
writeStream.write('APP,IP\n');

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
console.log('wrote all data to file');
});

	// close the stream
	writeStream.end();


//Starts browser then copies page to clipboard
async function scrape(item) {
	while (signal != 'ready') {
		const browser = await puppeteer.launch({
		headless: false});
		
		const page = await browser.newPage();
		//await sleep(3000)
		//process webpage
		await page.goto('enter site here' + item, {waitUntil: 'load'});
		await page.keyboard.down('ControlLeft');
		await page.keyboard.press('KeyA');
		await page.keyboard.up('ControlLeft');
		await page.keyboard.down('ControlLeft');
		await page.keyboard.press('KeyC');
		await page.keyboard.up('ControlLeft');

		await browser.close();
		let copy_paste = clipboardy.readSync()
		loading_check = []
		loading_check = copy_paste.split('\r\n')

		if (loading_check[7].includes('Loading')) {
			console.log('Loading Error')
		}
		
		else {
			var signal = 'ready'
			regex_plz(copy_paste,item)
		}
		//console.log(loading_check)
	
	}

		
		//console.log(copy_paste)

}

//processes array for scrape function
async function process_ip(array) { 
	for (const item of array) {
		//console.log(item)
		await scrape(item);
		//console.log(item.split('"')[1])
	}
}
async function regex_plz(copy_paste,item) {	
	var unique_app_name_1 = 'NULL'
	var unique_app_name_2 = 'NULL'
	var unique_app_name_3 = 'NULL'

	
	console.log('giving item')
	console.log(item)
	var content = copy_paste
	console.log(content+'\n')
	console.log('attempting regex\,')
	
	
	//var re = new RegExp(`\d\d\d`, "g");
	//var re = new RegExp('vip', "g");
	//var re = new RegExp(item)
	//console.log(typeof re)
	//var re = /\d\d/
	var IPAddress = item
	//var re = new RegExp(`.+?(?=${IPAddress})`, "g")
	var re_app = new RegExp(`.+?(?=\\s-\\sWide\\sIPs)`, "g")
	var app_name = content.match(re_app);
	
	if (app_name != null && app_name != 'Unknown Application') { 	
		
		console.log('Displaying initial app name')
		var unique_app_name_1 = (app_name[0])
		console.log(app_name[0])

		
	}	
	else {
		var re_app2 = new RegExp(`.+?(?=-vip)`, "g")
		var app_name2 = content.match(re_app2)
		
		//console.log(app_name2);
		var unique_app_name_2 = [...new Set(app_name2)].toString(); 
		console.log('Displaying app name 2')
		console.log(unique_app_name_2)
		if (app_name2 == null) {
			var app_name3 = content.split('\r\n')
			
			app_name_3_array = [];
			for (var i of app_name3) {
				if (i.includes("Loading")) {
					console.log('stuck loading')
					
				}
			for (var i of app_name3) {
				if (i.includes("Application")) {
					app_name_3_array.push(i.split('Application: ')[1])
				}
			}
			for (var i of app_name3) {
				if (i.includes("Unassociated VIP: ")) {
					app_name_3_array.push(i.split('Unassociated VIP: ')[1])
				}
			
			}
			for (var i of app_name3) {
				if (i.includes("Unassociated Wide IP: ")) {
					app_name_3_array.push(i.split('Unassociated Wide IP: ')[1])
				}
			
			}		
			
			
			}
			console.log('app_name3_array')
			//console.log(app_name_3_array)
			

			var unique_app_name_3 = [...new Set(app_name_3_array)].toString(); 
			console.log(unique_app_name_3)
		}
		
		
		
	}

	console.log('print function going here\n')
	var IPadd = item
	console.log(IPadd)
	console.log(unique_app_name_1)
	console.log(unique_app_name_2)
	console.log(unique_app_name_3)
	
	console.log('executing funciton')
	await print_to_csv(IPadd,unique_app_name_1,unique_app_name_2,unique_app_name_3)
}
async function print_to_csv(IPadd,unique_app_name_1,unique_app_name_2,unique_app_name_3) {
		var APP = ''
		if (unique_app_name_1 != 'NULL') {
			var APP = unique_app_name_1
		}
		
		else {
			if ( unique_app_name_2 != 'NULL') {
				var APP = unique_app_name_2
			
			
			}
			else {
				var APP = unique_app_name_3 
			}
		}
		
		fs.appendFile('flipper.csv', APP.replace(/,/g,'||') +','+ IPadd + '\n' , (err) => {
			if (err) throw err;
				console.log('printed')
		});
	
	console.log( APP.replace(/,/g,'||') + ',' + IPadd)
	
	
}	
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
process_ip(array)
