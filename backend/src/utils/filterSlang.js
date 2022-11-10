const slang = ['Piss', 'Bitch'];

exports.checkSlang = (a, b=slang) => {
  a = a.split(' ');
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let char1 = a[i].toLowerCase();
      let char2 = b[j].toLowerCase();

      if (char1 == char2) return true;
    }
  }
  return false;
};
