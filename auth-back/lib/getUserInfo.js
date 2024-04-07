function getUserInfo(user) {
    return {
        rut: user.rut,
        nombre: user.nombre,
        id: user.id || user._id,
    };
}

module.exports = getUserInfo;