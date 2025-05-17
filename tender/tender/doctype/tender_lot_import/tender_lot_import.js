// Copyright (c) 2025, Orient AI and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tender Lot Import", {
    refresh(frm) {
        if (!frm.doc.attachment) {
            frm.set_intro("Please attach a file to continue!", "blue");
        }
        if (frm.doc.attachment) {
            frm.add_custom_button("Process", () => {
                frappe.show_progress('Processing...', 70, 100, 'Please wait');
            });
        }
    },
    tender: function (frm) {
        frm.set_query("tender_batch", function () {
            return {
                filters: {
                    "tender": frm.doc.tender
                }
            };
        });
        frm.set_query("template", function () {
            return {
                filters: {
                    "tender": frm.doc.tender
                }
            };
        });
        frm.refresh_field("tender_batch");
        frm.refresh_field("template");
    },
});
