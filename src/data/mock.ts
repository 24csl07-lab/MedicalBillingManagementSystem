export const patients = [
  { id: 'P-1001', name: 'Priya Sharma', age: 34, phone: '+91 98765 43210', insurance: 'Star Health', status: 'Paid', doctor: 'Dr. Rajan Mehta', lastVisit: '2026-09-18' },
  { id: 'P-1002', name: 'Arjun Verma', age: 47, phone: '+91 87654 32109', insurance: 'HDFC Ergo', status: 'Pending', doctor: 'Dr. Sunita Patel', lastVisit: '2026-09-20' },
  { id: 'P-1003', name: 'Meera Nair', age: 29, phone: '+91 76543 21098', insurance: 'Max Bupa', status: 'Paid', doctor: 'Dr. Rajan Mehta', lastVisit: '2026-09-17' },
  { id: 'P-1004', name: 'Rohan Kapoor', age: 55, phone: '+91 65432 10987', insurance: 'ICICI Lombard', status: 'Pending', doctor: 'Dr. Vivek Anand', lastVisit: '2026-09-22' },
  { id: 'P-1005', name: 'Ananya Gupta', age: 41, phone: '+91 54321 09876', insurance: 'Religare', status: 'Paid', doctor: 'Dr. Sunita Patel', lastVisit: '2026-09-15' },
  { id: 'P-1006', name: 'Suresh Iyer', age: 62, phone: '+91 43210 98765', insurance: 'Bajaj Allianz', status: 'Overdue', doctor: 'Dr. Rajan Mehta', lastVisit: '2026-09-10' },
  { id: 'P-1007', name: 'Kavya Reddy', age: 26, phone: '+91 32109 87654', insurance: 'New India', status: 'Paid', doctor: 'Dr. Vivek Anand', lastVisit: '2026-09-21' },
  { id: 'P-1008', name: 'Deepak Singh', age: 38, phone: '+91 21098 76543', insurance: 'Star Health', status: 'Pending', doctor: 'Dr. Sunita Patel', lastVisit: '2026-09-19' },
];

export const invoices = [
  { id: 'INV-2001', patient: 'Priya Sharma', date: '2026-09-18', amount: 12500, status: 'Paid', doctor: 'Dr. Rajan Mehta' },
  { id: 'INV-2002', patient: 'Arjun Verma', date: '2026-09-20', amount: 8200, status: 'Pending', doctor: 'Dr. Sunita Patel' },
  { id: 'INV-2003', patient: 'Meera Nair', date: '2026-09-17', amount: 5600, status: 'Paid', doctor: 'Dr. Rajan Mehta' },
  { id: 'INV-2004', patient: 'Rohan Kapoor', date: '2026-09-22', amount: 18900, status: 'Pending', doctor: 'Dr. Vivek Anand' },
  { id: 'INV-2005', patient: 'Ananya Gupta', date: '2026-09-15', amount: 7300, status: 'Paid', doctor: 'Dr. Sunita Patel' },
  { id: 'INV-2006', patient: 'Suresh Iyer', date: '2026-09-10', amount: 22100, status: 'Overdue', doctor: 'Dr. Rajan Mehta' },
  { id: 'INV-2007', patient: 'Kavya Reddy', date: '2026-09-21', amount: 4800, status: 'Paid', doctor: 'Dr. Vivek Anand' },
  { id: 'INV-2008', patient: 'Deepak Singh', date: '2026-09-19', amount: 9600, status: 'Pending', doctor: 'Dr. Sunita Patel' },
];

export const payments = [
  { id: 'PAY-3001', patient: 'Priya Sharma', date: '2026-09-18', amount: 12500, method: 'UPI', invoice: 'INV-2001', receipt: 'REC-001' },
  { id: 'PAY-3002', patient: 'Meera Nair', date: '2026-09-17', amount: 5600, method: 'Card', invoice: 'INV-2003', receipt: 'REC-002' },
  { id: 'PAY-3003', patient: 'Ananya Gupta', date: '2026-09-15', amount: 7300, method: 'Net Banking', invoice: 'INV-2005', receipt: 'REC-003' },
  { id: 'PAY-3004', patient: 'Kavya Reddy', date: '2026-09-21', amount: 4800, method: 'Cash', invoice: 'INV-2007', receipt: 'REC-004' },
  { id: 'PAY-3005', patient: 'Deepak Singh', date: '2026-09-16', amount: 4000, method: 'UPI', invoice: 'INV-2008', receipt: 'REC-005' },
];

export const claims = [
  { id: 'CLM-4001', patient: 'Priya Sharma', provider: 'Star Health', amount: 9500, submitted: '2026-09-19', status: 'Approved' },
  { id: 'CLM-4002', patient: 'Arjun Verma', provider: 'HDFC Ergo', amount: 6800, submitted: '2026-09-21', status: 'Pending' },
  { id: 'CLM-4003', patient: 'Meera Nair', provider: 'Max Bupa', amount: 4200, submitted: '2026-09-18', status: 'Approved' },
  { id: 'CLM-4004', patient: 'Rohan Kapoor', provider: 'ICICI Lombard', amount: 15000, submitted: '2026-09-23', status: 'Pending' },
  { id: 'CLM-4005', patient: 'Suresh Iyer', provider: 'Bajaj Allianz', amount: 18000, submitted: '2026-09-12', status: 'Rejected' },
  { id: 'CLM-4006', patient: 'Kavya Reddy', provider: 'New India', amount: 3600, submitted: '2026-09-22', status: 'Approved' },
  { id: 'CLM-4007', patient: 'Deepak Singh', provider: 'Star Health', amount: 7200, submitted: '2026-09-20', status: 'Pending' },
];

export const revenueData = [
  { month: 'Apr', revenue: 520000, expenses: 180000 },
  { month: 'May', revenue: 680000, expenses: 220000 },
  { month: 'Jun', revenue: 590000, expenses: 195000 },
  { month: 'Jul', revenue: 740000, expenses: 240000 },
  { month: 'Aug', revenue: 810000, expenses: 260000 },
  { month: 'Sep', revenue: 850000, expenses: 275000 },
];

export const dailyRevenue = [
  { day: 'Mon', amount: 42000 },
  { day: 'Tue', amount: 38500 },
  { day: 'Wed', amount: 51000 },
  { day: 'Thu', amount: 29000 },
  { day: 'Fri', amount: 63000 },
  { day: 'Sat', amount: 22000 },
  { day: 'Sun', amount: 15000 },
];

export const notifications = [
  { id: 1, type: 'payment', title: 'Payment Received', message: 'Priya Sharma paid ₹12,500 for INV-2001', time: '10 min ago', read: false },
  { id: 2, type: 'claim', title: 'Claim Approved', message: 'Star Health approved CLM-4001 for ₹9,500', time: '1 hr ago', read: false },
  { id: 3, type: 'invoice', title: 'New Invoice Created', message: 'INV-2004 generated for Rohan Kapoor', time: '2 hrs ago', read: true },
  { id: 4, type: 'pending', title: 'Payment Overdue', message: 'Suresh Iyer — INV-2006 overdue since Sep 10', time: '5 hrs ago', read: false },
  { id: 5, type: 'claim', title: 'Claim Rejected', message: 'Bajaj Allianz rejected CLM-4005 — additional docs needed', time: '1 day ago', read: true },
  { id: 6, type: 'payment', title: 'Partial Payment', message: 'Deepak Singh made partial payment of ₹4,000', time: '1 day ago', read: true },
];
