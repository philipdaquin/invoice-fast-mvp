"use client";

import { useState } from "react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function Home() {
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Date.now().toString().slice(-6)}`
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [notes, setNotes] = useState("Payment due within 30 days. Thank you for your business!");
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0 },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const generatePDF = async () => {
    // Simple browser print-to-PDF
    window.print();
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-white p-8 max-w-3xl mx-auto">
        <button
          onClick={() => setShowPreview(false)}
          className="mb-6 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to edit
        </button>
        
        <div className="border border-gray-200 p-8 rounded-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
              <p className="text-gray-500">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{yourName || "Your Name"}</p>
              <p className="text-sm text-gray-500">{yourEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase mb-1">Bill To</p>
              <p className="font-semibold">{clientName || "Client Name"}</p>
              <p className="text-sm text-gray-600">{clientEmail}</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{clientAddress}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className="text-gray-400">Date:</span> {date}
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Due:</span> {dueDate}
              </p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs text-gray-400 uppercase">Description</th>
                <th className="text-right py-2 text-xs text-gray-400 uppercase">Qty</th>
                <th className="text-right py-2 text-xs text-gray-400 uppercase">Rate</th>
                <th className="text-right py-2 text-xs text-gray-400 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">{item.description || "—"}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 text-right">${(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-48">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400 uppercase mb-1">Notes</p>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          )}
        </div>

        <button
          onClick={generatePDF}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
        >
          Download PDF
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoice Fast ⚡</h1>
        <p className="text-gray-500 mb-8">Generate invoices in seconds</p>

        <div className="space-y-6">
          {/* Your Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Your Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={yourEmail}
                  onChange={(e) => setYourEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="you@email.com"
                />
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Invoice Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Invoice #</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Client Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Client Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="client@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <textarea
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                rows={2}
                placeholder="123 Business St, Suite 100&#10;City, State 12345"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Line Items</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Service description"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                    className="w-16 border border-gray-200 rounded-lg px-3 py-2 text-right"
                    min="1"
                  />
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-right"
                    placeholder="0.00"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    disabled={items.length === 1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700"
            >
              + Add line item
            </button>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Tax (10%): ${tax.toFixed(2)}</p>
                <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              rows={2}
              placeholder="Payment terms, thank you note..."
            />
          </div>

          {/* Actions */}
          <button
            onClick={() => setShowPreview(true)}
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 text-lg"
          >
            Preview Invoice →
          </button>
        </div>
      </div>
    </div>
  );
}