const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
        create(fighterData) {
            const {
                name,
                health,
                power,
                defense,
            } = fighterData;
    
            // Is fighter exist?
            const item = this.search({ name });
    
            if (item) {
                return null;
            }
    
            return FighterRepository.create({
                name,
                health,
                power,
                defense,
            });
        }
    
        read() {
            return FighterRepository.getAll();
        }
    
        update(id, fighterData) {
            const {
                name,
                health,
                power,
                defense,
            } = fighterData;
    
            // Is user exist?
            const item = this.search({ id });
    
            if (!item) {
                return null;
            }
    
            return FighterRepository.update(id, {
                name,
                health,
                power,
                defense,
            });
        }
    
        delete(id) {
            return FighterRepository.delete(id);
        }
    
        search(search) {
            const item = FighterRepository.getOne(search);
            if(!item) {
                return null;
            }
            return item;
        }
    }
    

module.exports = new FighterService();
