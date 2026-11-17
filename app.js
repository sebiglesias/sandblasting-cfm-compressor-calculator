
function calcBlasting() {
  const baseCfm = parseFloat(document.getElementById('nozzleOrifice').value) || 21;
  const psi = parseFloat(document.getElementById('blastPressure').value) || 90;
  const duty = document.getElementById('dutyType').value;

  // Pressure scaling factor: Airflow varies roughly with absolute pressure ratio
  const pressureFactor = (psi + 14.7) / (90 + 14.7);
  const totalCfm = baseCfm * pressureFactor;

  // General rule of thumb: 1 HP of 2-stage piston compressor generates 3.5 to 4.0 CFM @ 90 PSI
  let minHp = totalCfm / 3.8;
  if (duty === 'intermittent') {
    minHp = minHp * 0.7; // can lean on tank receiver reserve
  }

  let hpLabel = "5.0 – 7.5 HP (2-Stage)";
  let tankLabel = "60 to 80 Gallons";
  let hoseId = "1/2" ID Minimum";

  if (totalCfm > 50) {
    hpLabel = "15 – 20 HP Rotary Screw";
    tankLabel = "120+ Gallons";
    hoseId = "3/4" to 1" ID Industrial Hose";
  } else if (totalCfm > 30) {
    hpLabel = "10 HP (2-Stage Industrial)";
    tankLabel = "80 to 120 Gallons";
    hoseId = "1/2" to 3/4" ID Hose";
  } else if (totalCfm < 10) {
    hpLabel = "2.5 – 3.5 HP (Single/2-Stage)";
    tankLabel = "20 to 30 Gallons";
    hoseId = "3/8" ID Hose";
  }

  document.getElementById('resCfmNeeded').textContent = totalCfm.toFixed(1) + ' CFM @ ' + Math.round(psi) + ' PSI';
  document.getElementById('resCompHp').textContent = hpLabel;
  document.getElementById('resTankGal').textContent = tankLabel;
  document.getElementById('resHoseId').textContent = hoseId;
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calcBlasting);
  el.addEventListener('change', calcBlasting);
});
window.addEventListener('DOMContentLoaded', calcBlasting);
        