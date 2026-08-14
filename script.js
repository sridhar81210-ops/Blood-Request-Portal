// =============================================
//   DATA HELPERS  (localStorage)
// =============================================
function getData(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// =============================================
//   SAMPLE DATA  (runs once if storage empty)
// =============================================
function initSampleData() {
    if (getData('bloodRequests').length === 0) {
        setData('bloodRequests', [
            {
                id: 'BR001',
                patientName: 'Rahul Sharma',
                age: 45,
                bloodGroup: 'B+',
                units: 3,
                hospital: 'City General Hospital',
                city: 'Mumbai',
                contact: '9876543210',
                email: 'rahul@email.com',
                urgency: 'critical',
                status: 'pending',
                date: '2024-01-15',
                requiredDate: '2024-01-17',
                notes: 'Surgery scheduled, urgent requirement'
            },
            {
                id: 'BR002',
                patientName: 'Priya Patel',
                age: 28,
                bloodGroup: 'O-',
                units: 2,
                hospital: 'Apollo Hospital',
                city: 'Delhi',
                contact: '9988776655',
                email: 'priya@email.com',
                urgency: 'urgent',
                status: 'pending',
                date: '2024-01-16',
                requiredDate: '2024-01-20',
                notes: ''
            },
            {
                id: 'BR003',
                patientName: 'Amit Kumar',
                age: 60,
                bloodGroup: 'A+',
                units: 1,
                hospital: 'Max Hospital',
                city: 'Bangalore',
                contact: '8877665544',
                email: '',
                urgency: 'normal',
                status: 'fulfilled',
                date: '2024-01-10',
                requiredDate: '2024-01-25',
                notes: 'Regular transfusion needed'
            }
        ]);
    }

    if (getData('donors').length === 0) {
        setData('donors', [
            {
                id: 'D001',
                name: 'Vikram Singh',
                age: 30,
                gender: 'male',
                bloodGroup: 'O+',
                phone: '9876501234',
                email: 'vikram@email.com',
                city: 'Mumbai',
                lastDonation: '2023-10-15',
                medical: '',
                registeredDate: '2024-01-01'
            },
            {
                id: 'D002',
                name: 'Sneha Reddy',
                age: 25,
                gender: 'female',
                bloodGroup: 'A+',
                phone: '9887766554',
                email: 'sneha@email.com',
                city: 'Delhi',
                lastDonation: '2023-12-01',
                medical: '',
                registeredDate: '2024-01-05'
            },
            {
                id: 'D003',
                name: 'Arjun Mehta',
                age: 35,
                gender: 'male',
                bloodGroup: 'B+',
                phone: '7766554433',
                email: 'arjun@email.com',
                city: 'Mumbai',
                lastDonation: '',
                medical: '',
                registeredDate: '2024-01-08'
            },
            {
                id: 'D004',
                name: 'Kavita Nair',
                age: 28,
                gender: 'female',
                bloodGroup: 'O-',
                phone: '8899001122',
                email: 'kavita@email.com',
                city: 'Bangalore',
                lastDonation: '2023-11-20',
                medical: '',
                registeredDate: '2024-01-10'
            },
            {
                id: 'D005',
                name: 'Rohan Desai',
                age: 40,
                gender: 'male',
                bloodGroup: 'AB+',
                phone: '9900112233',
                email: '',
                city: 'Delhi',
                lastDonation: '2023-09-05',
                medical: '',
                registeredDate: '2024-01-12'
            }
        ]);
    }
}

// =============================================
//   NAVIGATION
// =============================================
function showSection(sectionName, btn) {
    // Toggle hero
    document.getElementById('hero-section').style.display =
        sectionName === 'home' ? 'block' : 'none';

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target section
    const target = document.getElementById('section-' + sectionName);
    if (target) target.classList.add('active');

    // Update active nav button
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Refresh data panels
    if (sectionName === 'requests-list') renderRequests();
    if (sectionName === 'search-donors') searchDonors();

    updateStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
//   BLOOD GROUP SELECTOR
// =============================================
function selectBloodGroup(el) {
    document.querySelectorAll('#bloodGroupSelector .blood-group-btn')
        .forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('selectedBloodGroup').value = el.dataset.group;
}

// =============================================
//   URGENCY SELECTOR
// =============================================
function selectUrgency(el) {
    document.querySelectorAll('#urgencySelector .urgency-option')
        .forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('selectedUrgency').value = el.dataset.urgency;
}

// =============================================
//   SUBMIT BLOOD REQUEST
// =============================================
function submitBloodRequest(e) {
    e.preventDefault();

    const bloodGroup = document.getElementById('selectedBloodGroup').value;
    const urgency    = document.getElementById('selectedUrgency').value;

    if (!bloodGroup) { showToast('Please select a blood group.', 'error'); return; }
    if (!urgency)    { showToast('Please select an urgency level.', 'error'); return; }

    const requests = getData('bloodRequests');

    const newReq = {
        id:          'BR' + String(requests.length + 1).padStart(3, '0'),
        patientName: document.getElementById('patientName').value.trim(),
        age:         parseInt(document.getElementById('patientAge').value),
        bloodGroup,
        units:       parseInt(document.getElementById('unitsRequired').value),
        hospital:    document.getElementById('hospitalName').value.trim(),
        city:        document.getElementById('city').value.trim(),
        contact:     document.getElementById('contactNumber').value.trim(),
        email:       document.getElementById('contactEmail').value.trim(),
        urgency,
        status:      'pending',
        date:        today(),
        requiredDate: document.getElementById('requiredDate').value,
        notes:       document.getElementById('additionalNotes').value.trim()
    };

    requests.unshift(newReq);
    setData('bloodRequests', requests);

    showToast(`Request ${newReq.id} submitted successfully!`, 'success');
    resetRequestForm();
    updateStats();
}

function resetRequestForm() {
    document.getElementById('bloodRequestForm').reset();
    document.querySelectorAll('#bloodGroupSelector .blood-group-btn')
        .forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('#urgencySelector .urgency-option')
        .forEach(o => o.classList.remove('selected'));
    document.getElementById('selectedBloodGroup').value = '';
    document.getElementById('selectedUrgency').value    = '';
}

// =============================================
//   RENDER REQUESTS  (table + mobile cards)
// =============================================
function renderRequests() {
    const requests      = getFilteredRequests();
    const tbody         = document.getElementById('requestsTableBody');
    const cardsDiv      = document.getElementById('requestCards');
    const emptyState    = document.getElementById('emptyState');

    if (requests.length === 0) {
        tbody.innerHTML     = '';
        cardsDiv.innerHTML  = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // --- Desktop table rows ---
    tbody.innerHTML = requests.map(r => `
        <tr>
            <td><strong>${r.id}</strong></td>
            <td>${r.patientName}</td>
            <td><span class="blood-type-badge">${r.bloodGroup}</span></td>
            <td>${r.units}</td>
            <td>${r.hospital}</td>
            <td>${r.city}</td>
            <td><span class="badge badge-${r.urgency}">${r.urgency}</span></td>
            <td><span class="badge badge-${r.status}">${r.status}</span></td>
            <td>${r.date}</td>
            <td style="display:flex;gap:5px;flex-wrap:wrap;">
                <button class="btn btn-sm btn-secondary" onclick="viewRequest('${r.id}')">View</button>
                ${r.status === 'pending' ? `
                    <button class="btn btn-sm btn-success" onclick="fulfillRequest('${r.id}')">✓ Fulfill</button>
                    <button class="btn btn-sm btn-danger"  onclick="cancelRequest('${r.id}')">✕ Cancel</button>
                ` : ''}
            </td>
        </tr>
    `).join('');

    // --- Mobile cards ---
    cardsDiv.innerHTML = requests.map(r => `
        <div class="request-card-item">
            <h4>
                ${r.patientName}
                <span class="blood-type-badge">${r.bloodGroup}</span>
            </h4>
            <div class="info-row"><span>ID</span>       <strong>${r.id}</strong></div>
            <div class="info-row"><span>Units</span>    <strong>${r.units}</strong></div>
            <div class="info-row"><span>Hospital</span> <strong>${r.hospital}</strong></div>
            <div class="info-row"><span>City</span>     <strong>${r.city}</strong></div>
            <div class="info-row"><span>Urgency</span>  <span class="badge badge-${r.urgency}">${r.urgency}</span></div>
            <div class="info-row"><span>Status</span>   <span class="badge badge-${r.status}">${r.status}</span></div>
            <div class="info-row"><span>Date</span>     <strong>${r.date}</strong></div>
            <div class="card-actions">
                <button class="btn btn-sm btn-secondary" onclick="viewRequest('${r.id}')">View</button>
                ${r.status === 'pending' ? `
                    <button class="btn btn-sm btn-success" onclick="fulfillRequest('${r.id}')">Fulfill</button>
                    <button class="btn btn-sm btn-danger"  onclick="cancelRequest('${r.id}')">Cancel</button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function getFilteredRequests() {
    let list = getData('bloodRequests');

    const bg     = document.getElementById('filterBloodGroup').value;
    const urg    = document.getElementById('filterUrgency').value;
    const stat   = document.getElementById('filterStatus').value;
    const search = document.getElementById('filterSearch').value.toLowerCase();

    if (bg)     list = list.filter(r => r.bloodGroup === bg);
    if (urg)    list = list.filter(r => r.urgency    === urg);
    if (stat)   list = list.filter(r => r.status     === stat);
    if (search) list = list.filter(r =>
        r.patientName.toLowerCase().includes(search) ||
        r.hospital.toLowerCase().includes(search)    ||
        r.city.toLowerCase().includes(search)        ||
        r.id.toLowerCase().includes(search)
    );

    return list;
}

function filterRequests() {
    renderRequests();
}

// =============================================
//   VIEW / FULFILL / CANCEL REQUEST
// =============================================
function viewRequest(id) {
    const req = getData('bloodRequests').find(r => r.id === id);
    if (!req) return;

    document.getElementById('requestModalContent').innerHTML = `
        <div style="text-align:center;margin-bottom:16px;">
            <span class="blood-type-badge" style="font-size:22px;padding:10px 28px;">${req.bloodGroup}</span>
        </div>
        <div class="modal-info-row"><span>Request ID</span>  <strong>${req.id}</strong></div>
        <div class="modal-info-row"><span>Patient</span>     <strong>${req.patientName} (Age ${req.age})</strong></div>
        <div class="modal-info-row"><span>Units</span>       <strong>${req.units}</strong></div>
        <div class="modal-info-row"><span>Hospital</span>    <strong>${req.hospital}</strong></div>
        <div class="modal-info-row"><span>City</span>        <strong>${req.city}</strong></div>
        <div class="modal-info-row"><span>Contact</span>     <strong>${req.contact}</strong></div>
        ${req.email ? `<div class="modal-info-row"><span>Email</span><strong>${req.email}</strong></div>` : ''}
        <div class="modal-info-row"><span>Urgency</span>     <span class="badge badge-${req.urgency}">${req.urgency}</span></div>
        <div class="modal-info-row"><span>Status</span>      <span class="badge badge-${req.status}">${req.status}</span></div>
        <div class="modal-info-row"><span>Requested On</span><strong>${req.date}</strong></div>
        ${req.requiredDate ? `<div class="modal-info-row"><span>Required By</span><strong>${req.requiredDate}</strong></div>` : ''}
        ${req.notes ? `<div class="modal-info-row"><span>Notes</span><strong>${req.notes}</strong></div>` : ''}
    `;
    openModal('requestModal');
}

function fulfillRequest(id) {
    if (!confirm('Mark this request as fulfilled?')) return;
    updateRequestStatus(id, 'fulfilled');
    showToast(`Request ${id} marked as fulfilled!`, 'success');
}

function cancelRequest(id) {
    if (!confirm('Cancel this request?')) return;
    updateRequestStatus(id, 'cancelled');
    showToast(`Request ${id} cancelled.`, 'info');
}

function updateRequestStatus(id, status) {
    const list = getData('bloodRequests');
    const req  = list.find(r => r.id === id);
    if (req) {
        req.status = status;
        setData('bloodRequests', list);
        renderRequests();
        updateStats();
    }
}

// =============================================
//   DONOR REGISTRATION
// =============================================
function submitDonorRegistration(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('donorAge').value);
    if (age < 18 || age > 65) {
        showToast('Donor age must be between 18 and 65.', 'error');
        return;
    }

    const donors = getData('donors');
    const newDonor = {
        id:             'D' + String(donors.length + 1).padStart(3, '0'),
        name:           document.getElementById('donorName').value.trim(),
        age,
        gender:         document.getElementById('donorGender').value,
        bloodGroup:     document.getElementById('donorBloodGroup').value,
        phone:          document.getElementById('donorPhone').value.trim(),
        email:          document.getElementById('donorEmail').value.trim(),
        city:           document.getElementById('donorCity').value.trim(),
        lastDonation:   document.getElementById('lastDonation').value,
        medical:        document.getElementById('donorMedical').value.trim(),
        registeredDate: today()
    };

    donors.push(newDonor);
    setData('donors', donors);

    showToast(`Thank you, ${newDonor.name}! You are now a registered donor.`, 'success');
    document.getElementById('donorForm').reset();
    updateStats();
}

// =============================================
//   SEARCH DONORS
// =============================================
function searchDonors() {
    let donors = getData('donors');

    const bg   = document.getElementById('searchBloodGroup').value;
    const city = document.getElementById('searchCity').value.toLowerCase().trim();

    if (bg)   donors = donors.filter(d => d.bloodGroup === bg);
    if (city) donors = donors.filter(d => d.city.toLowerCase().includes(city));

    const resultsDiv    = document.getElementById('donorResults');
    const emptyState    = document.getElementById('donorEmptyState');

    if (donors.length === 0) {
        resultsDiv.innerHTML     = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    resultsDiv.innerHTML = donors.map(d => `
        <div class="donor-card">
            <div class="donor-card-header">
                <h4>${d.name}</h4>
                <span class="blood-type-badge">${d.bloodGroup}</span>
            </div>
            <div class="donor-card-info">
                <span>📍 ${d.city}</span>
                <span>👤 ${capitalise(d.gender)}, Age ${d.age}</span>
                <span>📅 Registered: ${d.registeredDate}</span>
                <span>🩸 ${d.lastDonation ? 'Last Donation: ' + d.lastDonation : 'No previous donations'}</span>
            </div>
            <div class="donor-card-actions" style="margin-top:14px;">
                <button class="btn btn-sm btn-primary" onclick="contactDonor('${d.id}')">📞 Contact</button>
            </div>
        </div>
    `).join('');
}

function contactDonor(id) {
    const donor = getData('donors').find(d => d.id === id);
    if (!donor) return;

    document.getElementById('contactModalContent').innerHTML = `
        <div style="text-align:center;">
            <span class="blood-type-badge" style="font-size:20px;padding:8px 22px;">${donor.bloodGroup}</span>
            <h4 style="margin:14px 0 6px;font-size:20px;">${donor.name}</h4>
            <p style="margin:8px 0;">
                📞 <a href="tel:${donor.phone}" style="color:#c0392b;font-weight:bold;font-size:18px;">${donor.phone}</a>
            </p>
            ${donor.email ? `<p style="margin:6px 0;">📧 <a href="mailto:${donor.email}" style="color:#c0392b;">${donor.email}</a></p>` : ''}
            <p style="margin:6px 0;">📍 ${donor.city}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:14px 0;">
            <p style="font-size:13px;color:#999;">
                Please be polite and explain your requirement clearly.<br>
                The donor is volunteering their time and blood.
            </p>
        </div>
    `;
    openModal('contactModal');
}

// =============================================
//   MODAL HELPERS
// =============================================
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Close on overlay click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// =============================================
//   TOAST NOTIFICATIONS
// =============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast     = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3100);
}

// =============================================
//   STATS (animated counter)
// =============================================
function updateStats() {
    const requests  = getData('bloodRequests');
    const donors    = getData('donors');
    const fulfilled = requests.filter(r => r.status === 'fulfilled').length;

    animateCount('stat-requests',  requests.length);
    animateCount('stat-donors',    donors.length);
    animateCount('stat-fulfilled', fulfilled);
}

function animateCount(elId, target) {
    const el    = document.getElementById(elId);
    if (!el) return;
    const start = parseInt(el.textContent) || 0;
    if (start === target) return;

    const steps    = Math.abs(target - start);
    const stepTime = Math.max(10, Math.floor(500 / steps));
    const dir      = target > start ? 1 : -1;
    let   current  = start;

    const timer = setInterval(() => {
        current += dir;
        el.textContent = current;
        if (current === target) clearInterval(timer);
    }, stepTime);
}

// =============================================
//   UTILITIES
// =============================================
function today() {
    return new Date().toISOString().split('T')[0];
}

function capitalise(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// =============================================
//   INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initSampleData();
    updateStats();

    // Set min date for "Required By" input
    const requiredDateInput = document.getElementById('requiredDate');
    if (requiredDateInput) requiredDateInput.min = today();
});