# Copyright (c) 2025, Orient AI and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

from tender.controllers.tender_package import enqueue_tender_lot_import

class TenderPackage(Document):
    def after_insert(self):
        if self.is_imported:
            enqueue_tender_lot_import(self.name)
            
    def before_save(self):
        if not self.import_file:
            if self.import_status == "Processing":
                frappe.throw("Import is processing, can't delete import file.")
            self.number_of_total_rows = 0
            self.number_of_processed_rows = 0