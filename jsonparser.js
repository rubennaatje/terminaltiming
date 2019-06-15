var kleur = require('kleur');
colors = require('colors/safe');
module.exports = {
    JSONtoTableArray: function(array) {
        var data = [
                    ]; 

        var name = "";
        array.forEach(e => {
            var entry = [];
            entry.push(e.ranking);
            entry.push(e.number);
            entry.push(this.stringWithColor(e.state));
            entry.push(this.stringWithColor(e.category));
            entry.push(this.stringWithColor(e.category, ' ' +e.categoryPosition + ' '));
            entry.push(e.team);
            entry.push(e.driver);
            entry.push(e.car);
            entry.push(e.tyre);
            entry.push(e.lap);
            entry.push(e.classGap);
            entry.push(e.gapPrev);
            if(e.sector > 0)
                entry.push(e.currentSector1);
            else 
                entry.push("");    
            if(e.sector > 1)
                entry.push(e.currentSector2);
            else 
                entry.push("");
            if(e.sector > 2)
                entry.push(e.currentSector3);
            else 
                entry.push("");
            entry.push(e.lastlap);
            entry.push(e.pitstop);
            name = e.team;
            data.push(entry);
        });
        return data;
    },
    
     stringWithColor: function(name,val = null) {
        if(val == null){
            val = name;
        }
        switch (name) {
            case 'LMP1':
                return kleur.bold().bgRed(val);
                break;            
            case 'LMP2':
                return kleur.bold().bgBlue(val);
                break;
            case 'LMGTEPro':
                return kleur.bold().bgGreen(val);
                break;
            case 'LMGTEAm':
                return kleur.bold().bgYellow(val);
                break;
            case 'Run':
                return kleur.green(val);
                break;
            case 'Pit':
                return kleur.red(val);
                break;
            case 'Ret':
                return kleur.grey(val);
                break;
            case 'In':
                return kleur.white(val);
                break;
            case 'Out':
                return kleur.white(val);
                break;
            case 'Stop':
                return kleur.red(val);
                break;
            default: 
                return name;
            
        }
    }
};