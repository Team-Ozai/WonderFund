const db = require('../model/database.js')
const controller = require('./controller.js')

  test('get story 1', () => {
    return controller.getStoryFromID(1).then(data => {
      expect(typeof data.title).toBe("string");
    });
    done();
  });


  test('get RisksAndChallenges 1', () => {
    return controller.getRisksAndChallengesFromID(1).then(data => {
      expect(typeof data.title).toBe("string");
    });
    done();
  });

  test('get Environmental Commitments 1', () => {
    return controller.getEnvironmentalCommitmentsFromID(1).then(data => {
      expect(typeof data.title).toBe("string");
    });
    done();
  });
