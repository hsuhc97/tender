# Copyright (c) 2025, Orient AI and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class TenderCreditLimit(Document):
    def before_save(self):
        self.available_credit_limit = self.total_credit_limit - self.used_credit_limit
