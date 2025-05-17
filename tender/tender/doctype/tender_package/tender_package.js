// Copyright (c) 2025, Orient AI and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tender Package", {
	refresh(frm) {
		if (
			frm.doc.status == "Draft" &&
			frm.doc.is_bridged == 0 &&
			frm.doc.import_file &&
			frm.doc.tender_lot_import_template
		) {
			if (frm.doc.import_status == "No Processing Import") {
				frm.add_custom_button("Process", () => enqueueTenderLotImport(frm), "Import");
			} else if (frm.doc.import_status == "Processing") {
				// frm.add_custom_button("Cancel", () => cancelTenderLotImport(frm), "Cancel");
			} else if (frm.doc.import_status == "Failed") {
				frm.add_custom_button("Retry", () => enqueueTenderLotImport(frm), "Import");
			} else if (frm.doc.import_status == "Completed") {
				frm.add_custom_button(
					"Re-import",
					() => {
                        enqueueTenderLotImport(frm, true);
					},
					"Import"
				);
			}
		}
	},
});

function enqueueTenderLotImport(frm, restart = false) {
	frappe.call({
		method: "tender.controllers.tender_package.enqueue_tender_lot_import",
		args: {
			tender_package: frm.doc.name,
			restart: restart,
		},
		callback: function (r) {
			if (r.message === "queued") {
				frappe.show_alert({
					message: __("Tender Lot Import has been queued."),
					indicator: "green",
				});
			}
		},
	});
}
