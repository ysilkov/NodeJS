const { FighterRepository } = require('../repositories/fighterRepository');
const { fighter } = require('../models/fighter');

class FighterService {
    // TODO: Implement methods to work with fighters

    getAll() {
        const item = FighterRepository.getAll();
        return item ? item : null;
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        return item ? item : null;
    }

    create(data) {
        data.name = data.name.toUpperCase();
        if (!data.health) {
            data.health = fighter.health;
        }
        this.checkUnique(data);
        const item = FighterRepository.create(data);
        return item ? item : null;
    }

    update(id, data) {
        if (data.name) {
            data.name = data.name.toUpperCase();
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
            const item = FighterRepository.update(id, data);
            return item ? item : null;
        } else {
            throw new Error('Fighter not found');
        }
    }

    delete(id) {
        const currentItem = this.search({ id });
        if (currentItem) {
            const item = FighterRepository.delete(id);
            return item ? item : null;
        } else {
            throw new Error('Fighter not found');
        }
    }

    checkUnique(newData) {
        const uniqueKeys = Object.keys(uniqueChecker).filter(key => newData[key]);
        uniqueKeys.forEach(key => uniqueChecker[key](newData[key]));
    }
}

const uniqueChecker = {
    name: name => {
        if (FighterRepository.getOne({ name: name.toUpperCase() })) {
            throw new Error(`Not unique: name already registered`);
        }
    },
};

module.exports = new FighterService();
