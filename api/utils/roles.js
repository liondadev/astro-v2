/*
    Role & Permission management
*/

// Import logging utility
const log = require("../utils/log")

// Import the mongoose model for the user
const UserModel = require("../models/UserModel")

// Create the maps used for roles & permissions
const roles = new Map()
const permissions = new Map() // More of just storing the default for the permissions

// Register a role
const registerRole = (id, name, permissions) => {
    if (!id || !name || !permissions) {
        log(`CRITICAL::: Error creating role ${id}`, 'red')
        return false
    }

    roles.set(id, {
        name: name,
        permissions: permissions
    })

    return true
}

// Register a permission
const registerPermission = (id, def) => {
    if (!id, def) {
        log(`CRITICAL::: Error creating permission ${id} with def ${def}`, 'red')
        return false
    }

    permissions.set(id, def) // [id] = default value

    return true
}

// Get the object for a role
const getRole = (id) => {
    return roles.get(id) || {}
}

// Get the default value for a permission
const getPermission = (id) => {
    return permissions.get(id) || false
}

// Get list of roles for a user
const getUserRolesList = async (uuid) => {
    const user = await UserModel.findOne({uuid: uuid}).exec()
    if (!user) {
        log(`Warning: Attempted to check role list for unknown user ${uuid}`, 'yellow')
        return []
    }

    return user.roles || []
}

// Check if a user has a role
const userHasRole = async (uuid, role) => {
    const roles = await getUserRolesList(uuid)
    roles.forEach(roleID => {
        if (roleID == role) {
            return true
        }
    })

    return false
}

// List permissions for a role
const getRolePermissionsList = (roleID) => {
    const perms = roles.get(roleID).permissions
    if (!perms) {
        log(`Error getting list of perms for ROLE ${roleID}.`, 'yellow')
        return []
    }

    return perms
}

// Get list of permissions for a user
const getUserPermissionsList = async (uuid) => {
    let perms = []

    const user = await UserModel.findOne({uuid: uuid}).exec()
    if (!user) {
        log(`Error getting list of perms for USER ${uuid}.`, 'yellow')
        return false
    }

    const rolesList = user.roles
    rolesList.forEach(roleID => {
        getRolePermissionsList(roleID).forEach(perm => {
            perms.push(perm)
        })
    })

    return perms
}

// Check if a user has a permission
const userHasPermission = async (uuid, permissionID) => {
    const user = await UserModel.findOne({uuid: uuid}).exec()
    if (!user) {
        log(`Error getting list of perms for USER ${uuid}.`, 'yellow')
        return false
    }

    const permissionsList = await getUserPermissionsList(uuid)
    permissionsList.forEach(permID => {
        if (permID == permissionID) {
            return true
        }
    })

    return false
}


// Grant a role to a user
const grantUserRole = () => {

}

// Revoke a role to a user
const revokeUserRole = () => {

}

module.exports = {
    registerRole,
    registerPermission,
    getRole,
    getPermission,
    userHasRole,
    getUserRolesList,
    userHasPermission,
    getUserPermissionsList,
    grantUserRole,
    revokeUserRole,
    getRolePermissionsList
}
