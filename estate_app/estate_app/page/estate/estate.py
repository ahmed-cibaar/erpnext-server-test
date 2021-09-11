import frappe

@frappe.whitelist()
def get_grand_total():
    total = frappe.db.sql("""select sum(grand_total) as total from `tabProperty`""", as_dict=True)[0].total
    return total

@frappe.whitelist()
def get_property_price_by_status():
    price = frappe.db.sql("""
    SELECT status, SUM(grand_total) AS price FROM `tabProperty` GROUP BY status ORDER BY status ASC;
    """, as_dict=True)
    return price
