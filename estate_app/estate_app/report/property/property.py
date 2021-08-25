# Copyright (c) 2013, Ahmed Ibar and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	# columns, data = [], []
	return get_columns(), get_data(filters)

def get_data(filters):
	# print(f"\n\n\n\n {filters} \n\n\n\n\n")
	_from, _to = filters.get('from'), filters.get('to') # date range
	conditions = " AND 1=1 "
	_property = filters.get('property')
	agent = filters.get('agent')
	status = filters.get('status')
	if(_property): conditions += f" AND name LIKE '%{_property}%'"
	if(agent): conditions += f" AND agent = '{agent}'"
	if(status): conditions += f" AND status = '{status}'"
	
	# SQL Query
	data = frappe.db.sql(f"""SELECT name, property_name, address, property_type, status, 
	property_price, discount, grand_total, agent, agent_name FROM `tabProperty` 
	WHERE (creation BETWEEN '{_from}' AND '{_to}') {conditions};""")
	return data 

def get_columns():
	return [
		"ID:Link/Property:100",
		"Property Name:Data:150",
		"Address:Data:150",
		"Type:Data:150",
		"Status:Data:100",
		"Price:Currency:100",
		"Discount:Percent:100",
		"Grand Total:Currency:150",
		"Agent:Data:150",
		"Agent Name:Data:150",
	]
