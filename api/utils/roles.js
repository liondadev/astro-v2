/*
    Role Management Utility
*/

// Import utilities and models
const log = require("../utils/log");
const User = require("../models/UserModel");

// Setup the default maps containing roles and permissions
const roles = new Map();
const permissions = new Map();

// Role Schema
// [roleID] = { name: String, color: StringHex, powerLevel: Number, permissions: [ [permissionName] = Boolean ] }

// Permission Schema
// [permissionID] = { name: String, desc: String, Default: Boolean }

// Roles
const registerRole = (id, name, color, powerLvl, permissions) => {
  if (!id || !name || !color || !powerLvl || !permissions) return false;

  const roleObject = {
    name: name || id,
    color: color || "#ffffff", // Color HEX, defaults to white
    powerLevel: powerLvl || 0, // Higher power level = more permissions
    permissions: permissions || [], // Array containing the permissions the role posesses
  };

  log(`Registered role: ${JSON.stringify(roleObject)}`, yellow);

  roles.set(id, roleObject);
};

const getRoleObject = (id) => {
  if (!id) return false;

  const roleObject = map.get(id);
  return roleObject || false;
};

// Permissions
const registerPermission = (id, name, description, def) => {
  if (!id || !name || !description || !def) return false;

  const permissionObject = {
    name: name || "Unnamed Permission",
    description: description || "No permission on this description",
    default: def || false,
  };

  log(`Registered permission: ${JSON.stringify(permissionObject)}`, yellow);

  map.set(id, permissionObject);
};

const getPermissionObject = (id) => {
  if (!id) return false;

  const permissionObject = map.get(id);
  return permissionObject || false;
};

// Checking if a user has a role
const getPermissionsForUser = async (uuid) => {
  if (!uuid) return false;
  try {
    const user = await User.findOne({ uuid: uuid }).exec(); // Get the user object
    let rolesArray = []; // Initalize the role array
    let permissionsArray = []; // Initalize the permision array

    if (user.roles == []) return {};

    user.roles.forEach((role) => rolesArray.push(getRoleObject(role))); // Add all the roles to the roles array
    rolesArray.permissions.forEach((perm) => permissionsArray.push(perm)); // Add all the permissions from the role
    // to the permission arrau

    return permissionsArray;
  } catch (e) {
    // Log the error, just incase
    log(`Exception when getting all the perms for a user:\n${e}`, red);

    return {};
  }
};

const userHasPermission = async (uuid, id) => {
  if (!uuid || !id) return false;
  try {
    const userPermsList = getPermissionsForUser(uuid);

    if (userPermsList == {}) return getPermissionObject(id).default || false;

    userPermsList.forEach((perm) => {
      if (perm == id || perm == "*") {
        // * perm means all perms
        return true;
      }
    });

    return false; // Just incase the perms aren't there!
  } catch (e) {
    // Log the error, just incase
    log(`Exception when checking if user has permission:\n${e}`, red);

    return false;
  }
};

// Export everything
// NOTE: Theese functions, except userHasPermission and getPermissionsForUser
//       should not be called unless they are required.
//
//       They should only be called in the config file.
module.exports = {
  registerRole,
  getRoleObject,
  registerPermission,
  getPermissionObject,
  getPermissionsForUser,
  userHasPermission,
};
