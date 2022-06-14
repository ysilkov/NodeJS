const { UserRepository } = require('../repositories/userRepository');

class UserService {
    // TODO: Implement methods to work with user

    getAll() {
        const item = UserRepository.getAll();
        return item ? item : null;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        return item ? item : null;
    }

    create(data) {
        data.email = data.email.toLowerCase();
        this.checkUnique(data);
        const item = UserRepository.create(data);
        return item ? item : null;
    }

    update(id, data) {
        if (data.email) {
            data.email = data.email.toLowerCase();
        }
        const currentItem = this.search({ id });
        if (currentItem) {
            // Remove unchanged values to avoid false checking them for uniqueness
            for (let key in data) {
                if (data[key] == currentItem[key]) {
                    delete data[key];
                }
            }
            this.checkUnique(data);
            const item = UserRepository.update(id, data);
            return item ? item : null;
        } else {
            throw new Error('User not found');
        }
    }

    delete(id) {
        const currentItem = this.search({ id });
        if (currentItem) {
            const item = UserRepository.delete(id);
            return item ? item : null;
        } else {
            throw new Error('User not found');
        }
    }

    checkUnique(newData) {
        const uniqueKeys = Object.keys(uniqueChecker).filter(key => newData[key]);
        uniqueKeys.forEach(key => uniqueChecker[key](newData[key]));
    }
}

const uniqueChecker = {
    email: email => {
        if (UserRepository.getOne({ email: email.toLowerCase() })) {
            throw new Error(`Not unique: email already registered`);
        }
    },
    phoneNumber: phoneNumber => {
        if (UserRepository.getOne({ phoneNumber: phoneNumber })) {
            throw new Error(`Not unique: phoneNumber already registered`);
        }
    },
};

module.exports = new UserService();
