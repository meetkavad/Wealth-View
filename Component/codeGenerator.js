// 6-digit Code generator :
function generateCode() {
  return Math.floor(Math.random() * 900000 + 100000);
}

module.exports = generateCode;
