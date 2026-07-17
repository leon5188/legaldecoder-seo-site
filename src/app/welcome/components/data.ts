import { SegmentData } from './types';

export const SEGMENTS: Record<string, SegmentData> = {
  renter: {
    docName: "Residential Lease Agreement.pdf",
    riskScore: 72,
    riskLabel: "Moderate Risk",
    riskColorClass: "from-amber-500 to-orange-600",
    riskGlowColor: "#f59e0b",
    clauses: [
      {
        id: "rent-c1",
        tab: "redflags",
        title: "Critical §4.2 Termination Penalty",
        risk: "critical",
        riskScore: "95/100",
        text: "If Tenant terminates prior to the 12-month expiration, Tenant shall forfeit the entirety of the Security Deposit and remain liable for all remaining monthly rent payments under the Lease Term.",
        explanation: "Forfeiture of the entire deposit coupled with accelerating the remaining lease payments is considered an illegal double-recovery penalty in most jurisdictions. Landlords must mitigate damages by looking for a new tenant.",
        recommendation: "Negotiate a standard buy-out clause: early termination permitted with 60 days written notice and a penalty fee equal to 1.5x or 2x one month's rent."
      },
      {
        id: "rent-c2",
        tab: "redflags",
        title: "Liability §11.5 Negligence Waiver",
        risk: "high",
        riskScore: "82/100",
        text: "Landlord shall not be liable for any injury, damage, or loss to Tenant or Tenant's property, including that caused by water leaks, fire, mold, or Landlord's own active negligence.",
        explanation: "Landlords are legally responsible for maintaining habitable premises. You cannot waive liability for a landlord's active negligence or willful failure to maintain the property.",
        recommendation: "Strike 'or Landlord's own active negligence' and replace with: 'except to the extent caused by the gross negligence or willful misconduct of Landlord'."
      },
      {
        id: "rent-c3",
        tab: "rights",
        title: "Right of Entry §6.1 Notice",
        risk: "medium",
        riskScore: "55/100",
        text: "Landlord reserves the right to enter the Premises at any time without notice for the purposes of inspection, repairs, or showing the property to prospective tenants.",
        explanation: "This violates your right to quiet enjoyment. Standard leases require a minimum of 24 to 48 hours notice before entry, except in extreme emergencies.",
        recommendation: "Amend to: 'Landlord may enter the Premises only upon 24 hours prior written notice, during normal business hours (9 AM - 5 PM), except in case of emergencies.'"
      },
      {
        id: "rent-c4",
        tab: "summary",
        title: "Rent Buyout & Sublet Policy",
        risk: "low",
        riskScore: "25/100",
        text: "Tenant may not sublet the premises or assign this Lease without prior written consent of the Landlord, which shall not be unreasonably withheld.",
        explanation: "The provision that consent 'shall not be unreasonably withheld' is protective for you, ensuring the landlord cannot block a replacement tenant arbitrarily.",
        recommendation: "No changes needed. Keep this clause intact as it acts as a safeguard."
      }
    ],
    chatHistory: [
      { id: "m1", sender: "user", text: "Are there any hidden costs in Section 4.2?" },
      { id: "m2", sender: "ai", text: "Yes. Section 4.2 forces you to forfeit your security deposit AND pay all remaining rent if you leave early. This is an atypical and highly punitive double-recovery clause.", badge: "Section 4.2" },
      { id: "m3", sender: "user", text: "Is the landlord's entry notice legal?" },
      { id: "m4", sender: "ai", text: "Entering 'at any time without notice' is generally illegal under local tenant rights laws. A landlord must typically give 24-hour notice before non-emergency entry.", badge: "Section 6.1" }
    ],
    suggestions: [
      "What should I negotiate?",
      "Is this termination clause legal?",
      "What happens if I break the lease early?"
    ],
    aiResponses: {
      "What should I negotiate?": "Focus on two major areas: 1) §4.2 early buyout fee capped at 2 months' rent instead of all remaining rent. 2) Adding a mandatory 24-hour written notice for landlord entry.",
      "Is this termination clause legal?": "Forfeiting your deposit AND remaining liable for all monthly payments is considered a penalty and is likely unenforceable in court. Standard practice is a 2-month rent buyout.",
      "What happens if I break the lease early?": "Under this contract, they could sue you for remaining months of rent and keep your deposit. We strongly advise adding an explicit Early Termination Buyout clause."
    }
  },
  freelancer: {
    docName: "Contractor Agreement_Final.docx",
    riskScore: 85,
    riskLabel: "High Risk",
    riskColorClass: "from-red-500 to-rose-600",
    riskGlowColor: "#ef4444",
    clauses: [
      {
        id: "free-c1",
        tab: "redflags",
        title: "Critical §8.1 IP Assignment",
        risk: "critical",
        riskScore: "97/100",
        text: "Any and all works, ideas, designs, or improvements created by Contractor during the term of this Agreement shall be the sole and exclusive property of Client, regardless of whether they relate to the Services.",
        explanation: "This is an extremely broad IP trap. It assigns ownership of your personal projects, pre-existing code, and unrelated designs created while you are under contract.",
        recommendation: "Limit assignment solely to 'Deliverables created specifically for Client under a signed Statement of Work, excluding Contractor's pre-existing IP and utilities'."
      },
      {
        id: "free-c2",
        tab: "redflags",
        title: "Unlimited §12.3 Contractor Indemnity",
        risk: "high",
        riskScore: "88/100",
        text: "Contractor agrees to indemnify, defend, and hold harmless Client from and against any and all claims, damages, losses, liabilities, and expenses arising out of the performance of Services.",
        explanation: "Unlimited indemnity exposes you to uncapped financial ruin. You should never indemnify a client for their own actions or negligence.",
        recommendation: "Cap total liability/indemnity at 'fees paid to Contractor under this Agreement' and add a mutual waiver for consequential damages."
      },
      {
        id: "free-c3",
        tab: "rights",
        title: "Payment Timeline §3.2 Timeline",
        risk: "medium",
        riskScore: "60/100",
        text: "Client shall pay all undisputed invoices within 90 days of receipt. No late fees or interest shall apply to outstanding balances.",
        explanation: "90 days is a long payment cycle that can severely harm a freelancer's cash flow. Plus, you have no recourse for late payments.",
        recommendation: "Change payment terms to Net 30 or Net 15, and add a late interest fee of 1.5% per month."
      },
      {
        id: "free-c4",
        tab: "summary",
        title: "Non-Solicitation Scope",
        risk: "low",
        riskScore: "30/100",
        text: "Contractor shall not solicit Client's employees for a period of 12 months after the termination of this Agreement.",
        explanation: "This is a standard protection for the client and does not restrict your ability to take on other freelance clients.",
        recommendation: "Acceptable as written. Ensure it does not block you from hiring general contractors publicly."
      }
    ],
    chatHistory: [
      { id: "m1", sender: "user", text: "Do they own the code I write on weekends?" },
      { id: "m2", sender: "ai", text: "Under the current wording of §8.1, yes. It assigns ALL work created 'during the term' regardless of whether it relates to the project. This must be narrowed.", badge: "Section 8.1" },
      { id: "m3", sender: "user", text: "Is a 90-day payment term standard?" },
      { id: "m4", sender: "ai", text: "No. Standard payment terms for independent contractors are typically Net 30 or Net 15. Net 90 acts as an interest-free loan for the client.", badge: "Section 3.2" }
    ],
    suggestions: [
      "How do I protect my pre-existing code?",
      "Is a 90-day payment term standard?",
      "How should I cap my liability?"
    ],
    aiResponses: {
      "How do I protect my pre-existing code?": "Add a 'Pre-Existing IP' clause: 'Contractor retains all right, title, and interest in any tools, code libraries, or designs developed prior to or independently of this Agreement.'",
      "Is a 90-day payment term standard?": "Absolutely not. Negotiate for: 'Client shall pay all undisputed invoices within 30 days of receipt. Late payments shall accrue interest at 1.5% per month.'",
      "How should I cap my liability?": "Insert a cap clause: 'In no event shall Contractor's aggregate liability under this Agreement exceed the total amounts paid to Contractor hereunder in the 12 months preceding the claim.'"
    }
  },
  entrepreneur: {
    docName: "SaaS Enterprise SLA.pdf",
    riskScore: 45,
    riskLabel: "Low-Mod Risk",
    riskColorClass: "from-emerald-500 to-teal-600",
    riskGlowColor: "#10b981",
    clauses: [
      {
        id: "ent-c1",
        tab: "redflags",
        title: "Security §9.4 Uncapped Data Breach",
        risk: "high",
        riskScore: "78/100",
        text: "In no event shall either party's liability exceed the fees paid in the prior 12 months, except in the event of a data security breach, for which Customer's damages shall be uncapped.",
        explanation: "Uncapped liability for data breaches can bankrupt a startup. Enterprise customers demand this, but SaaS providers should negotiate a 'super-cap' instead of unlimited liability.",
        recommendation: "Negotiate a 'super-cap' equal to 3x or 5x the total fees paid under this Agreement in the preceding 12 months for data security and privacy claims."
      },
      {
        id: "ent-c2",
        tab: "redflags",
        title: "Auto-Renewal §14.2 Wide Notice Window",
        risk: "medium",
        riskScore: "62/100",
        text: "This Agreement shall automatically renew for successive 1-year terms unless either party provides written notice of non-renewal at least 90 days prior to the expiration of the current term.",
        explanation: "A 90-day notice window is very wide. If you miss it by just one day, you are locked in and financially obligated for another full year.",
        recommendation: "Negotiate the notice period down to 30 days or 45 days. This provides more flexibility."
      },
      {
        id: "ent-c3",
        tab: "rights",
        title: "Service Level §5.1 Uptime Guarantee",
        risk: "low",
        riskScore: "35/100",
        text: "Provider guarantees a service availability uptime of 99.9% per calendar month, excluding scheduled maintenance.",
        explanation: "99.9% uptime (approx. 43 mins of downtime/month) is the standard baseline for SaaS. Ensure service credits are the customer's sole remedy.",
        recommendation: "Keep uptime at 99.9%, but confirm that service credit allocations are the exclusive remedy for service outages."
      },
      {
        id: "ent-c4",
        tab: "summary",
        title: "Data Use & Analytics",
        risk: "low",
        riskScore: "20/100",
        text: "Provider may compile, analyze, and use aggregated, anonymized analytical metadata derived from Customer's platform usage.",
        explanation: "This allows you to improve your AI model/platform using anonymized telemetry, which is standard and safe for SaaS platforms.",
        recommendation: "Acceptable as is. Ensure your customer data privacy agreement (DPA) backs this up."
      }
    ],
    chatHistory: [
      { id: "m1", sender: "user", text: "What is a standard super-cap for data breaches?" },
      { id: "m2", sender: "ai", text: "A standard enterprise super-cap is 3x to 5x the annual contract value. Uncapped liability exposes your SaaS business to existential risk.", badge: "Section 9.4" },
      { id: "m3", sender: "user", text: "Is the 90 days auto-renewal normal?" },
      { id: "m4", sender: "ai", text: "Yes, but it is disadvantageous. Most SaaS buyers negotiate this down to 30 or 45 days to avoid accidental multi-year lock-ins.", badge: "Section 14.2" }
    ],
    suggestions: [
      "What is a standard super-cap for data breaches?",
      "Can we change the auto-renewal notice to 30 days?",
      "How are uptime credits calculated?"
    ],
    aiResponses: {
      "What is a standard super-cap for data breaches?": "Standard SaaS practice is a capped liability for data breaches, often set at 3x to 5x the contract value of the preceding 12 months, or a flat $1M-$2M super-cap depending on firm size.",
      "Can we change the auto-renewal notice to 30 days?": "Yes, propose: 'either party provides written notice of non-renewal at least 30 days prior to the expiration of the current term.' Customers usually accept this.",
      "How are uptime credits calculated?": "Usually calculated as a percentage of the monthly service fee: e.g., if uptime falls below 99.9%, a 10% credit; if below 99.0%, a 25% credit. Make sure credits apply to the next billing cycle."
    }
  },
  hr: {
    docName: "Executive Employment Agreement.pdf",
    riskScore: 68,
    riskLabel: "Moderate Risk",
    riskColorClass: "from-indigo-500 to-purple-600",
    riskGlowColor: "#6366f1",
    clauses: [
      {
        id: "hr-c1",
        tab: "redflags",
        title: "Critical §10.1 Non-Compete Scope",
        risk: "critical",
        riskScore: "92/100",
        text: "For a period of 24 months following termination of employment, Executive shall not directly or indirectly engage in, perform services for, or invest in any business that competes with Employer in North America.",
        explanation: "A 24-month duration is excessive, and 'North America' is overly broad for a geographic restriction. Non-competes face heavy legal challenges and regulatory restrictions.",
        recommendation: "Reduce duration to 6 months (or strike entirely) and limit the scope to named direct competitors within a 20-mile radius of the primary office."
      },
      {
        id: "hr-c2",
        tab: "redflags",
        title: "Equity §6.3 Immediate Forfeiture",
        risk: "high",
        riskScore: "80/100",
        text: "Upon termination of employment for any reason, all unvested stock options and equity grants shall immediately terminate and be forfeited to the Company.",
        explanation: "If you are terminated without 'Cause' or resign for 'Good Reason', you should receive accelerated vesting of equity that would have vested in the next 12 months.",
        recommendation: "Add: 'except that in the event of termination by Company without Cause, or by Executive for Good Reason, vesting of all equity shall accelerate by 12 months'."
      },
      {
        id: "hr-c3",
        tab: "rights",
        title: "Severance §7.2 Base Salary Term",
        risk: "medium",
        riskScore: "50/100",
        text: "Executive shall receive 3 months of base salary as severance pay, subject to executing a general release of claims, in the event of termination by Employer without Cause.",
        explanation: "For executive roles, a 3-month severance is on the low end. Standard executive severance packages range from 6 to 12 months of base salary plus benefits.",
        recommendation: "Negotiate for 6 or 12 months of base salary, plus pro-rated target bonus and COBRA coverage reimbursement."
      },
      {
        id: "hr-c4",
        tab: "summary",
        title: "Invention Assignment Definition",
        risk: "low",
        riskScore: "20/100",
        text: "Executive assigns all rights to inventions created using Employer's equipment, resources, or proprietary trade secret information.",
        explanation: "This is a balanced clause that protects the company's IP but permits you to retain personal inventions built on your own time and devices.",
        recommendation: "Ensure you attach a list of 'Pre-Existing Inventions' to Exhibit A before signing."
      }
    ],
    chatHistory: [
      { id: "m1", sender: "user", text: "Are non-competes legal in my state?" },
      { id: "m2", sender: "ai", text: "States like California, Minnesota, and Oklahoma ban employment non-competes entirely. Other states enforce them only if restricted to narrow roles, brief timeframes, and direct competitors.", badge: "Section 10.1" },
      { id: "m3", sender: "user", text: "What is standard severance for an executive?" },
      { id: "m4", sender: "ai", text: "Standard executive severance is usually 6 to 12 months of base salary, plus medical benefits (COBRA) and accelerated vesting on equity.", badge: "Section 7.2" }
    ],
    suggestions: [
      "Are non-competes legal in my state?",
      "What is standard severance for executives?",
      "How does equity acceleration work?"
    ],
    aiResponses: {
      "Are non-competes legal in my state?": "Non-compete legality varies. California, Oklahoma, and Minnesota prohibit them. New York and others enforce them strictly only if narrow. Propose replacing it with a Non-Solicitation of Customers clause.",
      "What is standard severance for executives?": "Standard is 6 to 12 months of base salary, COBRA premiums, and a pro-rated bonus for the current fiscal year, paid in lump sum or normal payroll cycles.",
      "How does equity acceleration work?": "You should ask for 'double-trigger acceleration' upon a change of control, or 'single-trigger' 12-month acceleration if terminated without Cause, allowing options to vest immediately."
    }
  }
};
