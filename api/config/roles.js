/*
    Role configuration
*/

const { registerRole, registerPermission } = require("../utils/roles");

/*
    Permissions
*/

// Devices - Registering
registerPermission(
    "device_register",
    "Self-Register Device",
    "Register devices you own",
    true
)
registerPermission(
    "device_register_others",
    "Register Device Others",
    "Register devices for other people",
    false
)

// Devices - Viewing
registerPermission(
    "device_view",
    "View Your Devices",
    "View devices owned by yourself",
    true
)
registerPermission(
    "device_view_others",
    "View Others' Devices",
    "View devices owned by other people",
    false
)

// Devices - Deleting
registerPermission(
    "device_delete",
    "Delete Your Devices",
    "Delete devices you own, does not work for subusers",
    true
)
registerPermission(
    "device_delete_others",
    "Delete Others' Devices",
    "Delete devices owned by other people",
    false
)

// Devices - Editing
registerPermission(
    "device_edit",
    "Edit Your Devices",
    "Edit the devices owned under your account",
    true
)
registerPermission(
    "device_edit_others",
    "Edit Others' Devices",
    "Edit devices owned by other people",
    false
)

// Devices - Viewing Camera
registerPermission(
    "device_view_camera",
    "View the Cameras of your devices",
    "View the camera of devices under your account",
    true
)
registerPermission(
    "device_view_camera_others",
    "View the Cameras of Others' Devices",
    "View the camera of devices under other people's accounts",
    false
)

// Account Management
registerPermission(
    "account_manage",
    "Manage Your Account",
    "Manage your account",
    true
)
registerPermission(
    "account_manage_others",
    "Manage Others' Accounts",
    "Manage other people's accounts",
    false
)

/*
    Roles
*/

// Root
registerRole(
    "root",
    "Root",
    "#d63031",
    9999,
    [
        ["*"] = true // Give the root group all the permissions
    ]
)

registerRole(
    "support",
    "Support Agent",
    "#d63031",
    9999,
    [
        ["*"] = true // Give the root group all the permissions
    ]
)

