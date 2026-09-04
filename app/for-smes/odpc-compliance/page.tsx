'use client';

import { useState } from 'react';

interface AuditItem {
  id: number;
  title: string;
  description: string;
  remedy: string;
  templateUrl: string;
  templateLabel: string;
}

const auditItems: AuditItem[] = [
  {
    id: 1,
    title: 'Data Controller/Processor Registration Status',
    description: 'Have you registered as a data controller or processor with the ODPC?',
    remedy: 'Register your organization with the ODPC through their online portal. If you handle personal data, registration is mandatory under the Data Protection Act.',
    templateUrl: '/templates/odpc-registration-guide.pdf',
    templateLabel: 'Registration Guide',
  },
  {
    id: 2,
    title: 'Lawful Basis for Processing Customer Data',
    description: 'Do you have a documented lawful basis (consent, contract, legal obligation, etc.) for every type of personal data you collect?',
    remedy: 'Conduct a data mapping exercise to identify the lawful basis for each processing activity. Document consent forms or contractual clauses.',
    templateUrl: '/templates/lawful-basis-checklist.docx',
    templateLabel: 'Lawful Basis Checklist',
  },
  {
    id: 3,
    title: 'Clear & Accessible Privacy Policy',
    description: 'Is your privacy policy publicly available, easy to understand, and does it cover all required elements?',
    remedy: 'Draft or update your privacy policy to include data categories, purposes, retention periods, data subject rights, and ODPC contact details.',
    templateUrl: '/templates/privacy-policy-template.docx',
    templateLabel: 'Privacy Policy Template',
  },
  {
    id: 4,
    title: 'Data Subject Rights (DSR) Handling Process',
    description: 'Do you have a defined process to handle data subject access requests, rectification, erasure, and objections?',
    remedy: 'Develop an internal procedure for receiving, verifying, and responding to DSR requests within 30 days.',
    templateUrl: '/templates/dsr-procedure-template.docx',
    templateLabel: 'DSR Procedure Template',
  },
  {
    id: 5,
    title: 'Incident/Breach Notification Plan (72-hour ODPC rule)',
    description: 'Do you have an incident response plan that includes ODPC notification within 72 hours of a high-risk breach?',
    remedy: 'Create a data breach response plan with roles, communication templates, and a timeline for ODPC and data subject notifications.',
    templateUrl: '/templates/breach-notification-plan.docx',
    templateLabel: 'Breach Notification Plan',
  },
  {
    id: 6,
    title: 'Staff Data Protection Training',
    description: 'Have all employees received data protection and privacy training in the last 12 months?',
    remedy: 'Implement a training program covering data protection principles, security practices, and breach reporting. Keep attendance records.',
    templateUrl: '/templates/staff-training-outline.pdf',
    templateLabel: 'Training Outline',
  },
  {
    id: 7,
    title: 'Third-Party Vendor Data Protection Agreements',
    description: 'Do you have data processing agreements (DPAs) in place with all vendors who process personal data on your behalf?',
    remedy: 'Review and sign DPAs with all third-party service providers, including clauses on security, breach notification, and sub-processing.',
    templateUrl: '/templates/dpa-template.docx',
    templateLabel: 'DPA Template',
  },
  {
    id: 8,
    title: 'Data Encryption & Access Control Standards',
    description: 'Is personal data encrypted at rest and in transit, with role-based access controls implemented?',
    remedy: 'Implement encryption for databases and backups, enable TLS for web traffic, and enforce least privilege access with strong authentication.',
    templateUrl: '/templates/encryption-access-policy.docx',
    templateLabel: 'Encryption & Access Policy',
  },
];

export default function OdpcCompliancePage() {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = auditItems.length;
  const scorePercentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const getStatus = (score: number) => {
    if (score === 100) return { label: 'Compliant', color: 'bg-teal-100 text-teal-800 border-teal-300' };
    if (score >= 75) return { label: 'Action Needed', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { label: 'High Risk', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  const status = getStatus(scorePercentage);

  const uncheckedItems = auditItems.filter((item) => !checkedItems[item.id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">ODPC Compliance Self-Assessment</h1>
        <p className="mt-2 text-slate-600">
          Evaluate your SME's alignment with the Data Protection Act, 2019. Check each item you have implemented.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div className="text-xl font-semibold text-slate-800">
            Compliance Score: {scorePercentage}%
          </div>
          <span className={`inline-block px-4 py-2 rounded-full border text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${scorePercentage === 100 ? 'bg-teal-500' : scorePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {checkedCount} of {totalItems} items completed
        </p>
      </div>

      <div className="space-y-4">
        {auditItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-sm border p-5 transition-colors ${
              checkedItems[item.id] ? 'border-teal-300 bg-teal-50/50' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={`audit-${item.id}`}
                checked={!!checkedItems[item.id]}
                onChange={() => toggleItem(item.id)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <div className="flex-1">
                <label htmlFor={`audit-${item.id}`} className="block text-lg font-medium text-slate-900 cursor-pointer">
                  {item.title}
                </label>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                {!checkedItems[item.id] && (
                  <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Action needed:</span> {item.remedy}
                    </p>
                    <a
                      href={item.templateUrl}
                      download
                      className="mt-2 inline-block text-sm text-teal-700 hover:text-teal-900 font-medium underline"
                    >
                      Download {item.templateLabel}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {uncheckedItems.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recommended Next Steps</h2>
          <ul className="space-y-3">
            {uncheckedItems.map((item) => (
              <li key={item.id} className="text-sm text-slate-700">
                <span className="font-medium text-slate-900">{item.title}:</span> {item.remedy}
                <a
                  href={item.templateUrl}
                  download
                  className="ml-2 text-teal-700 hover:text-teal-900 underline"
                >
                  Template
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}