// Copyright (c) 2025, Orient AI and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tender Lot", {
    update_quantity(frm) {
        let total_quantity = 0;
        for (let lot_item of frm.doc.lot_items) {
            total_quantity += lot_item.quantity;
        }
        frm.set_value("quantity", total_quantity);
    },
    update_item(frm) {
        let item_code = undefined
        for (let lot_item of frm.doc.lot_items) {
            if (item_code === undefined) {
                item_code = lot_item.item;
            } else if (item_code !== lot_item.item) {
                item_code = undefined;
                break;
            }
        }
        frm.set_value("item", item_code);
    },
    update_grade(frm) {
        let grade = undefined
        for (let lot_item of frm.doc.lot_items) {
            if (grade === undefined) {
                grade = lot_item.grade;
            } else if (grade !== lot_item.grade) {
                grade = "Mixed Grade"
                break;
            }
        }
        frm.set_value("grade", grade);
    }, 
    update_lock_condition(frm) {
        let lock_condition = undefined
        for (let lot_item of frm.doc.lot_items) {
            if (lock_condition === undefined) {
                lock_condition = lot_item.lock_condition;
            } else if (lock_condition !== lot_item.lock_condition) {
                lock_condition = "Mixed Lock Condition"
                break;
            }
        }
        frm.set_value("lock_condition", lock_condition);
    },
});

frappe.ui.form.on("Tender Lot Item", {
    quantity(frm) {
        frm.trigger("update_quantity");
    },
    item(frm) {
        frm.trigger("update_item");
    },
    grade(frm) {
        frm.trigger("update_grade");
    },
    lock_condition(frm) {
        frm.trigger("update_lock_condition");
    },
    lot_items_remove(frm) {
        frm.trigger("update_quantity");
        frm.trigger("update_item");
        frm.trigger("update_grade");
        frm.trigger("update_lock_condition");
    },
});