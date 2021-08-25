import frappe


@frappe.whitelist()
def check_propery_types(property_type):
    return frappe.db.sql(f"""SELECT name, property_name, property_type, status FROM `tabProperty` WHERE property_type = '{property_type}';""", as_dict=True)