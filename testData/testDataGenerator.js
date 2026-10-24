function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(length = 5) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function getDynamicDate(yearsAgo = 0) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - yearsAgo);
  return d.toISOString().split('T')[0];
}

function getDynamicTimeSlot() {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return `${String(d.getHours()).padStart(2, '0')}:00`;
}

function generateFamilyMemberData() {
  const firstName = 'User' + randomString(4);
  const lastName = 'Test' + randomString(3);
  const dob = getDynamicDate(randomInt(18, 50));
  const phone = '9' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@testmail.com`;
  return { firstName, lastName, dob, phone, email };
}

function generateLabReportData() {
  const descriptions = [
    'Blood test report for routine checkup',
    'Lipid profile test conducted at Apollo Diagnostics',
    'Annual health screening report',
    'Follow-up blood work after medication',
  ];
  return {
    description: descriptions[randomInt(0, descriptions.length - 1)],
  };
}

function generateAppointmentData() {
  const reasons = [
    'I have a severe headache since two days',
    'Experiencing dizziness and nausea',
    'Need a follow-up for my neurological condition',
    'Recurring migraine for the past week',
  ];
  return {
    description: reasons[randomInt(0, reasons.length - 1)],
  };
}

function generateDepartmentData() {
  const title = 'Dept' + randomString(4);
  const description = 'Description of ' + title;
  const floors = ['1st Floor', '2nd Floor', '3rd Floor', 'Ground Floor'];
  return { title, description, floor: floors[randomInt(0, floors.length - 1)] };
}

function generateSpecializationData() {
  const title = 'Spec' + randomString(4);
  return { title, description: 'Description for ' + title };
}

function generateBranchData() {
  const name = 'Branch' + randomString(4);
  const email = name.toLowerCase() + '@testmail.com';
  return { name, address: randomInt(100, 999) + ' Test Street', email };
}

function generateDoctorData() {
  const firstName = 'Doc' + randomString(4);
  const lastName = 'Test' + randomString(3);
  const dob = getDynamicDate(randomInt(30, 50));
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@testmail.com`;
  const phone = '8' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const regNum = String(randomInt(1000000, 9999999));
  const qualifications = ['MD', 'MBBS', 'MS', 'DM'];
  const inPersonFee = String(randomInt(100, 500));
  const videoFee = String(randomInt(200, 600));
  return { firstName, lastName, dob, email, phone, regNum, qualification: qualifications[randomInt(0, 3)], inPersonFee, videoFee };
}

function generateScheduleData() {
  const startHour = randomInt(8, 14);
  const endHour = startHour + randomInt(2, 4);
  const pad = n => String(n).padStart(2, '0');
  return { startTime: `${pad(startHour)}:00`, endTime: `${pad(endHour)}:00` };
}

function generateStaffData() {
  const firstName = 'Staff' + randomString(4);
  const lastName = 'Test' + randomString(3);
  const dob = getDynamicDate(randomInt(22, 40));
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@testmail.com`;
  const phone = '9' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const salary = String(randomInt(8000, 50000));
  return { firstName, lastName, dob, email, phone, salary };
}

function generateHospitalPatientData() {
  const firstName = 'Pat';
  const lastName = 'Test' ;
  const age = String(randomInt(18, 70));
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@testmail.com`;
  const phone = '8' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const aadhar = Array.from({ length: 12 }, () => randomInt(0, 9)).join('');
  const emergencyContact = 'EC' + randomString(4);
  const emergencyPhone = '7' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  return { firstName, lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone };
}

function generateReviewData() {
  const reviews = [
    'Great experience, doctor was very attentive and helpful',
    'Very professional and thorough consultation',
    'Excellent service, highly recommend this doctor',
    'Doctor explained everything clearly and patiently',
  ];
  return { description: reviews[randomInt(0, reviews.length - 1)] };
}

function generateDocumentData() {
  const descriptions = [
    'Annual health checkup document',
    'Insurance claim supporting document',
    'Pre-surgery medical clearance',
    'Discharge summary from hospital',
  ];
  const types = ['imaging', 'prescription', 'report', 'other'];
  return {
    description: descriptions[randomInt(0, descriptions.length - 1)],
    type: types[randomInt(0, types.length - 1)],
  };
}

function generateEMRData() {
  const complaints = ['Persistent headache since 3 days', 'Chest pain and shortness of breath', 'Fever with chills for 2 days', 'Back pain radiating to legs'];
  const symptoms = ['Anxiety And Fever', 'Palpitations and sweating', 'Cough, cold, sore throat', 'Joint pain and stiffness'];
  const histories = ['Patient had similar episode 6 months ago', 'No prior history of illness', 'History of hypertension for 5 years', 'Underwent surgery 2 years ago'];
  const conditions = ['Hypertension, Diabetes', 'No known conditions', 'Asthma since childhood', 'Thyroid disorder'];
  const allergies = ['Penicillin', 'Peanuts', 'Dust and pollen', 'No known allergies'];
  const medications = ['Metformin 500mg', 'Amlodipine 5mg', 'Atorvastatin 10mg', 'No current medications'];
  const examinations = ['BP normal, lungs clear', 'Abdomen soft, non-tender', 'Mild tenderness in lower back', 'Heart sounds normal'];
  const diagnoses = ['Tension headache', 'Hypertensive urgency', 'Viral fever', 'Lumbar spondylosis'];
  const treatments = ['Rest, hydration, analgesics', 'Antihypertensive medication', 'Antipyretics and fluids', 'Physiotherapy and NSAIDs'];
  const r = arr => arr[randomInt(0, arr.length - 1)];
  return {
    bp: `${randomInt(110, 140)}/${randomInt(70, 90)}`,
    fever: String(randomInt(97, 102)),
    heartRate: String(randomInt(60, 100)),
    respRate: String(randomInt(12, 20)),
    spo2: String(randomInt(95, 100)),
    weight: String(randomInt(50, 100)),
    height: String(randomInt(150, 190)),
    complaint: r(complaints),
    symptoms: r(symptoms),
    history: r(histories),
    conditions: r(conditions),
    allergy: r(allergies),
    medication: r(medications),
    examination: r(examinations),
    diagnosis: r(diagnoses),
    alternative: 'Alternative ' + r(diagnoses).toLowerCase(),
    testsOrdered: 'CBC, LFT, RFT',
    treatment: r(treatments),
    clinicalNotes: 'Follow up in ' + randomInt(1, 4) + ' weeks',
    fbs: String(randomInt(80, 130)),
    ppbs: String(randomInt(120, 200)),
    hba1c: (randomInt(55, 85) / 10).toFixed(1),
    sugarNotes: 'Monitor sugar levels daily',
    adherence: 'Good adherence to medication',
    missedDoses: String(randomInt(0, 3)),
    sideEffects: 'Mild nausea occasionally',
    medicationChanges: 'No changes required',
    diet: 'Low carb, high protein diet',
    activity: 'Moderate walking 30 min daily',
    smoker: 'Non-smoker',
    alcohol: 'Occasional',
    sleep: String(randomInt(6, 9)) + ' hours',
    retino: 'No retinopathy detected',
    peripheral: 'Normal peripheral pulses',
    kidney: 'Creatinine 0.9, eGFR normal',
    bpControl: 'BP well controlled on medication',
    neuropathy: 'No peripheral neuropathy',
    drugDosage: String(randomInt(100, 500)) + 'mg',
    dosageFrequency: ['OD', 'BD', 'TID'][randomInt(0, 2)],
    days: String(randomInt(3, 14)),
    qty: String(randomInt(5, 30)),
    afterMeal: 'After meals with water',
    bloodTests: 'CBC, Blood Sugar, HbA1c',
    dietInstructions: 'Avoid oily and spicy food',
  };
}

function generateBookingData() {
  const today = new Date();
  today.setDate(today.getDate() + randomInt(1, 30));
  const notes = [
    'Follow-up consultation',
    'Routine checkup',
    'Second opinion needed',
    'Post-surgery review',
    'General health assessment',
    'Chronic condition monitoring',
  ][randomInt(0, 5)];
  const patientSearchTerms = ['Deepthi', 'Pat', 'Test', 'User'];
  const patientSearch = patientSearchTerms[randomInt(0, patientSearchTerms.length - 1)];
  const timeSlotIndex = randomInt(0, 4);
  return {
    date: today.toISOString().split('T')[0],
    notes,
    patientSearch,
    timeSlotIndex,
  };
}

function generateRescheduleData() {
  const today = new Date();
  today.setDate(today.getDate() + randomInt(1, 30));
  return { date: today.toISOString().split('T')[0] };
}

function generateCancelData() {
  const reasons = [
    'Not feeling well today',
    'Schedule conflict, need to reschedule',
    'Personal emergency came up',
    'Doctor recommended a different specialist',
  ];
  return { reason: reasons[randomInt(0, reasons.length - 1)] };
}

function generateTenantData() {
  const suffix = randomString(5);
  const hospitalName = 'Hospital' + suffix;
  const subdomain = 'hosp' + suffix.toLowerCase();
  const email = `admin.${suffix.toLowerCase()}@testmail.com`;
  const phone = '9' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  return { hospitalName, subdomain, email, phone };
}

function generateBranchDoctorData() {
  const d = generateDoctorData();
  const aadhar = Array.from({ length: 12 }, () => randomInt(0, 9)).join('');
  return { ...d, mobile: d.phone, aadhar, experience: String(randomInt(1, 30)) };
}

function generateBranchScheduleData() {
  const s = generateScheduleData();
  const room = String(randomInt(100, 999));
  return { ...s, room, slotDuration: '15 minutes', maxPatients: String(randomInt(10, 50)) };
}

function generateBranchStaffData() {
  const s = generateStaffData();
  const aadhar = Array.from({ length: 12 }, () => randomInt(0, 9)).join('');
  return { ...s, mobile: s.phone, aadhar, joiningDate: getDynamicDate(0) };
}

function generateBranchPatientData() {
  const p = generateHospitalPatientData();
  return {
    ...p,
    mobile: p.phone,
    emergencyName: 'EC' ,
    emergencyMobile: '7' + Array.from({ length: 9 }, () => randomInt(0, 9)).join(''),
    notes: ['fever and chills', 'headache and nausea', 'back pain', 'chest discomfort'][randomInt(0, 3)],
  };
}

function generateBranchInvoiceData() {
  const services = ['video consultation', 'in-person visit', 'lab test review', 'follow-up checkup'];
  const qty = String(randomInt(1, 5));
  const price = String(randomInt(100, 1000));
  const discount = String(randomInt(0, 20));
  return { serviceDesc: services[randomInt(0, services.length - 1)], qty, price, discount };
}

function generateBranchAdHocServiceData() {
  const names = ['Monsoon Fever Package', 'Diabetes Screening', 'BP Monitoring', 'ECG Test'];
  const today = new Date();
  today.setFullYear(today.getFullYear() + 1);
  const descriptions = ['Blood sugar test', 'ECG monitoring', 'Routine checkup', 'Fever panel'];
  const reasons = ['Patient requested', 'Doctor advised', 'Routine screening', 'Follow-up required'];
  return {
    name: names[randomInt(0, names.length - 1)] + randomString(3),
    price: String(randomInt(100, 500)),
    refPrice: String(randomInt(50, 200)),
    qty: String(randomInt(1, 10)),
    expiry: today.toISOString().split('T')[0],
    description: descriptions[randomInt(0, descriptions.length - 1)],
    reason: reasons[randomInt(0, reasons.length - 1)],
  };
}

module.exports = { generateFamilyMemberData, generateLabReportData, generateAppointmentData, getDynamicDate, getDynamicTimeSlot, generateStaffPatientData, generateInvoiceData, generateDepartmentData, generateSpecializationData, generateBranchData, generateDoctorData, generateScheduleData, generateStaffData, generateHospitalPatientData, generateTenantData, generateReviewData, generateDocumentData, generateRescheduleData, generateCancelData, generateEMRData, generateBookingData, generateBranchDoctorData, generateBranchScheduleData, generateBranchStaffData, generateBranchPatientData, generateBranchInvoiceData, generateBranchAdHocServiceData };

function randomLetters(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join('');
}

function generateStaffPatientData() {
  const firstName = 'Pat' + randomLetters(4);
  const lastName = 'Test' + randomLetters(3);
  const age = String(randomInt(18, 70));
  const aadhar = Array.from({ length: 12 }, () => randomInt(0, 9)).join('');
  const phone = '9' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@testmail.com`;
  const emergencyContact = 'EC' + randomString(4);
  const emergencyPhone = '8' + Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
  const symptoms = ['fever and chills', 'headache and nausea', 'back pain', 'chest discomfort'][randomInt(0, 3)];
  const allergies = ['peanuts', 'penicillin', 'dust', 'shellfish'][randomInt(0, 3)];
  const medication = ['dolo 650', 'paracetamol', 'ibuprofen', 'aspirin'][randomInt(0, 3)];
  return { firstName, lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication };
}

function generateInvoiceData() {
  const serviceTypes = ['consultation', 'follow-up visit', 'lab test review', 'general checkup'];
  const amounts = ['200', '300', '500', '150'];
  const idx = randomInt(0, serviceTypes.length - 1);
  const date = new Date();
  date.setDate(date.getDate() + randomInt(0, 7));
  return {
    serviceType: serviceTypes[idx],
    amount: amounts[idx],
    date: date.toISOString().split('T')[0],
  };
}
