import frappe
from estate_app.utils import sendmail
def before_save(doc, event):
    pass
    # if(doc.status == 'Rent'): doc.property_type = 'Duplex'
    # frappe.msgprint("Good Job")

def on_update(doc, event):
    frappe.msgprint(f"{doc.name} is been updated by {doc.owner}")

def after_insert(doc, event):
    note = frappe.get_doc({
        "doctype": "Note",
        "title": f"{doc.name} Added",
        "public": True,
        "content": doc.description
    })
    note.insert()
    frappe.db.commit()
    frappe.msgprint(f"{note.title} has been created")

    # send mail
    agent_email = frappe.get_doc('Agent', doc.agent)
    msg = f"Hello <b> {doc.agent_name}, a property has been created on your behalf. </b>"
    attachments = [frappe.attach_print(doc.doctype, doc.name, file_name=doc.name)]
    # doc, recipients, msg, title, attachments
    sendmail(doc, [agent_email.email, 'test@mail.com'], msg, 'New Property', attachments)