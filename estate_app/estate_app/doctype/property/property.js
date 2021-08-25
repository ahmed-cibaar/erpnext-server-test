// Copyright (c) 2021, Ahmed Ibar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	setup: frm => {
		// check amenity duplicate
		frm.check_amenities_duplicate = (frm, row) => {
			// console.log(row)
			frm.doc.amenities.forEach(item => {
				// console.log(item)
				if(row.amenity == ''  || row.idx == item.idx){
					// pass
				} else {
					if(row.amenity == item.amenity){
						// clear field
						row.amenity = '';
						frappe.throw(__(`${item.amenity} already exists in row ${item.idx}`));
						frm.refresh.field('amenities')
					}
				}
			});
		}
		// check flat against outdoor kitchen
		frm.check_flat_against_outdoor_kitchen = (frm, row) => {
			if(row.amenity == 'Outdoor Kitchen' && frm.doc.property_type == 'Flat'){
				let amenity = row.amenity;
				row.amenity = '';
				frappe.throw(__(`${amenity} cannot exist in Flat`));
				frm.refresh_field('amenities');
			}
		}
		// calculation
		frm.compute_total = (frm) => {
			let total = 0;
			let property_price = frm.doc.property_price;
			let discount = frm.doc.discount;
			// loop through child table
			frm.doc.amenities.forEach(item => {
				total += item.amenity_price;
			});
			let grand_total = total + property_price;
			// check if there is discount
			if(frm.doc.discount){
				grand_total = grand_total - (grand_total * (discount/100))
			}
			frm.set_value('grand_total', grand_total)
			console.log(grand_total)
		}
		// copy from parent to childtable
		frm.copy_discount = frm => {
			frm.doc.amenities.forEach(item => {
				item.discount = frm.doc.discount;
			});
			frm.refresh_field('amenities');
		}
	},
	property_price: frm => {
		frm.compute_total(frm);
	},
	discount: frm => {
		frm.copy_discount(frm)
		frm.compute_total(frm);
	},

	
	refresh: function(frm) {
		// Add custom button to your form
		// frm.add_custom_button('Say Hi', () => {
		// 	console.log("Hi");
		// }, 'Action');	
		// frm.add_custom_button('Ping', () => {
		// 	console.log("Hi");
		// }, 'Action');	
		// frm.add_custom_button('Pong', () => {
		// 	console.log("Hi");
		// }, 'Action');	

		// Use prompt to change value of field
		frm.add_custom_button('Say Hi', () => {
			frappe.prompt('Address', ({value})=> {
				frm.set_value('address', value);
				frm.refresh_field('address');
				frappe.msgprint(__('Document updated successfully'));
			})
			
		}, "Actions");	
		
		// Check property types
		frm.add_custom_button('Check Property Types', () => {
			let property_type = frm.doc.property_type;
			
			// make ajax call
			frappe.call({
				method: "estate_app.estate_app.doctype.property.api.check_propery_types",
				args: {'property_type': property_type},
				callback: r => {
					// console.log(r.message)
					if(r.message.length > 0){
						let header = `<h3>Below properties are of type ${property_type}</h3>`;
						let body = ``;
						r.message.forEach(data => {
							let content = `<p>Document Name: <b> ${data.name} </b> <a href='/app/property/${data.name}'> Visit </a> </p>`;
							body += content;						
						});
						let div = header + body
						frappe.msgprint(__(div));
					}
				}
			});
		}, "Actions");
	},
});

// Amenities Child Table
frappe.ui.form.on('Property Amenity Detail', {
	amenity: (frm, cdt, cdn) => {
		// Grap the entire row
		let row = locals[cdt][cdn];
		// console.log(row.amenity_price)
		frm.check_flat_against_outdoor_kitchen(frm, row) 
		frm.check_amenities_duplicate(frm, row);
		frm.compute_total(frm);
	},
	amenities_remove: (frm, cdt, cdn) => {
		let row = locals[cdt][cdn];
		frm.compute_total(frm);
		console.log('Removed')
	}
});
