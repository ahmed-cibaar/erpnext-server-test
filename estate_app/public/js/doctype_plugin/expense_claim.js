frappe.ui.form.on('Expense Claim', {
    setup(frm) {
        // copy from parent to child table
        frm.expense_date_update = frm => {
            frm.doc.expenses.forEach(date => {
                date.expense_date = frm.doc.posting_date;
            });
            frm.refresh_field('expenses');
        }
    },
    posting_date: frm => {
        frm.expense_date_update(frm); 
    },
	refresh(frm) {
// 		console.log(frm)
	}
})

// Expense Claim Detail
frappe.ui.form.on('Expense Claim Detail', {
	refresh(frm) {
// 		console.log(frm)
	},
	expenses_add(frm, cdt, cdn) {
	    let row = locals[cdt][cdn];
	    if(frm.doc.posting_date){
	        row.expense_date = frm.doc.posting_date;
	        frm.refresh_field('expenses');
	    }
	   // console.log(row)
	},
	expenses_remove(frm, cdt, cdn) {
	    let row = locals[cdt][cdn];
	    
	   // console.log(cdn)
	}
})