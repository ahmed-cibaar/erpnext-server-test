# Copyright (c) 2021, Ahmed Ibar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
	# pass
	#on_change (runs when the form's data is changed and saved)
	def on_change(self):
		pass
		# frappe.msgprint(f'There is change in {self.name}')
	# after_insert (checks the when data is inserted to database)
	def after_insert(self):
		pass
		# frappe.msgprint(f'Document {self.name} inserted successfully')
	# validate (runs when the save button is clicked to validate the form)
	def validate(self):
		try:
			frappe.db.sql("""SELECT name, tenant, friends FROM `tabProperty`""")
		except Exception as e:
			error =frappe.log_error(frappe.get_traceback(), f"{e}")
			frappe.msgprint(f"An error occured see <a href='/app/error-log/{error.name}'> <b>{error.name}</b></a>")
	# 	if(self.property_type == "Flat"):
	# 		for amenity in self.amenities:
	# 			if(amenity.amenity == "Outdoor Kitchen"):
	# 				frappe.throw(f'Property of type <b> Flat </b> should not have amenity <b>{amenity.amenity}</b>')


			# SQL (for loop is not used)
			# amenity = frappe.db.sql(f"""SELECT amenity FROM `tabProperty Amenity Detail` WHERE parenttype = 'Property' AND parent = {self.name} AND amenity = 'Outdoor Kitchen';""", as_dict=True)
			# if(amenity):
			# 	frappe.throw(f'Property of type <b> Flat </b> should not have amenity <b>{amenity[0].amenity}</b>')
				# frappe.throw(f'Property of type <b> Flat </b> should not have amenity <b>{amenity}</b>')