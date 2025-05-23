/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
    return new Promise((resolve, reject) =>{
      const results = new Array(iterable.length);
      let unsolved = iterable.length;
  
      if(unsolved === 0){
        resolve(results);
        return;
      }
  
      iterable.forEach(async (item, index) =>{
        try{
          const value = await item;
          results[index] = value;
          unsolved-=1;
          if(unsolved ===0){
            resolve(results);
          }
        } catch (err){
          reject(err);
        }
      });
    });
  }