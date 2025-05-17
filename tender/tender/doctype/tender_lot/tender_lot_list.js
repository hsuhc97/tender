frappe.listview_settings["Tender Lot"] = {
    refresh: function(listview) {
        listview.page.add_inner_button("Import", function() {
            console.log("ButtonFunction");
        });;
    },
};
