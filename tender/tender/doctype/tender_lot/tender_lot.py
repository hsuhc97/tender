# Copyright (c) 2025, Orient AI and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.model.document import Document


class TenderLot(Document):
    def before_insert(self):
        tender_package = frappe.get_doc('Tender Package', self.tender_package)
        self.bid_type = tender_package.bid_type
        self.close_time = tender_package.close_time

        if (tender_package.tender):
            tender = frappe.get_doc('Tender', tender_package.tender)
            self.tender = tender.name
            self.bid_type = tender.bid_type
            self.currency = tender.currency
   
        item = None
        quantity = 0
        grade = None
        lock_condition = None
        attributes = {}
        for index, lot_item in enumerate(self.lot_items):
            if item is None and index == 0:
                item = lot_item.item
            else:
                if (item != lot_item.item):
                    item = None
            
            quantity += lot_item.quantity
            if grade is None:
                grade = lot_item.grade
            else:
                if (grade != lot_item.grade):
                    grade = "Mixed Grade"
            if lock_condition is None:
                lock_condition = lot_item.lock_condition
            else:
                if (lock_condition != lot_item.lock_condition):
                    lock_condition = "Mixed Lock Condition"

            _attributes = json.loads(lot_item.attributes)
            for attribute_name, attribute_value in _attributes.items():
                if attribute_name not in attributes:
                    attributes[attribute_name] = attribute_value
                else:
                    attributes[attribute_name] = "Mixed " + attribute_name
   
        self.item = item
        self.quantity = quantity
        self.grade = grade
        self.lock_condition = lock_condition
        for attribute_name, attribute_value in attributes.items():
            self.append("attributes", {
                "attribute_name": attribute_name,
                "attribute_value": attribute_value,
            })

        if item is None:
            if len(self.lot_items) > 0:
                self.title = "Mixed"
        else:
            self.title = item
