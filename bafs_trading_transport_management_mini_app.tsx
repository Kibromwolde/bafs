import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  CreditCard, 
  LayoutDashboard, 
  PlusCircle, 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  User, 
  MapPin, 
  ArrowRight, 
  RefreshCw, 
  Download, 
  Copy, 
  Trash2, 
  Edit3, 
  Phone, 
  ShieldCheck, 
  Send, 
  X, 
  ChevronRight,
  Globe,
  PackageCheck
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    title: "BAFS TRADING PLC",
    subtitle: "Transport & Credit Management",
    connected: "Connected Mini App",
    welcome: "Welcome Back",
    dashOverview: "Active Fleet Status & BAFS Credit Balances",
    totalCreditPool: "Total Credit Pool",
    bafsBankAccounts: "BAFS Bank Accounts",
    activeShipments: "Active Freight",
    totalOps: "Total Operations",
    deliveredJobs: "Delivered Jobs",
    completedTrips: "Completed Trips",
    fuelAllocations: "Fuel Allocations",
    totalDisbursed: "Total Disbursed",
    dispatchTruck: "Dispatch Truck",
    addCreditLine: "Add Credit Line",
    recentOpsStatus: "Recent Operations Status",
    viewAll: "View All",
    creditAccountsTitle: "BAFS Credit Accounts",
    creditSubtitle: "Financial allocation derived from excel template",
    combinedBalance: "Combined Available Balance",
    accountsListed: "Accounts Listed",
    searchCreditPlaceholder: "Search Account Number or Bank...",
    transportOpsTitle: "Transport Operations",
    opsSubtitle: "Manage shipments & fleet locations",
    searchOpsPlaceholder: "Search Plate, Driver, Destination, ID...",
    dispatchNew: "Dispatch New Transport",
    dispatchSubtitle: "Register new shipment & assign fuel allowance",
    plateNumber: "Truck Plate Number",
    driverName: "Driver Name",
    driverPhone: "Driver Phone",
    cargoType: "Cargo Type / Goods",
    cargoWeight: "Cargo Weight (Tons)",
    originPoint: "Origin Point",
    destinationPoint: "Destination",
    linkedAccount: "Linked BAFS Credit Account",
    selectAccount: "-- Select BAFS Account --",
    fuelAllowance: "Fuel Allowance (ETB)",
    etaDate: "Estimated Delivery (ETA)",
    confirmDispatch: "Confirm & Register Dispatch",
    guideTitle: "Beginner Setup Guide (100% Free)",
    guideSubtitle: "How to host & connect to Telegram @BotFather",
    navDashboard: "Dashboard",
    navCredits: "Credits",
    navOps: "Operations",
    navDispatch: "Dispatch",
    navGuide: "Guide",
    statusPending: "Pending",
    statusInTransit: "In Transit",
    statusCustoms: "Customs Cleared",
    statusDelivered: "Delivered",
    bankCBE: "Commercial Bank of Ethiopia",
    bankDashen: "Dashen Bank",
    bankAwash: "Awash Bank",
    bankAbyssinia: "Bank of Abyssinia",
    copy: "Copy",
    copied: "Copied to clipboard!",
    statusUpdateModal: "Update Operation",
    currentLocation: "Current Position",
    saveChanges: "Save Changes",
    addAccountModal: "Add BAFS Credit Account",
    selectBank: "Bank Name",
    accountNumber: "Account Number",
    creditAmount: "Credit Amount (ETB)",
    addAccountBtn: "Add Account",
    resetBtn: "Reset Data"
  },
  am: {
    title: "ባፍስ ትሬዲንግ ኃ/የተ/የግ/ማ",
    subtitle: "የትራንስፖርት እና የብድር አስተዳደር",
    connected: "የተገናኘ ሚኒ አፕ",
    welcome: "እንኳን ደህና መጡ",
    dashOverview: "የተሽከርካሪዎች ሁኔታ እና የባፍስ የብድር ሂሳብ",
    totalCreditPool: "ጠቅላላ የብድር መጠን",
    bafsBankAccounts: "የባፍስ የባንክ ሂሳቦች",
    activeShipments: "በጉዞ ላይ ያሉ ጭነቶች",
    totalOps: "ጠቅላላ ስራዎች",
    deliveredJobs: "የደረሱ ጭነቶች",
    completedTrips: "የተጠናቀቁ ጉዞዎች",
    fuelAllocations: "የነዳጅ አበል",
    totalDisbursed: "ጠቅላላ የወጣ ወጪ",
    dispatchTruck: "መኪና አሰማራ",
    addCreditLine: "የብድር ሂሳብ ጨምር",
    recentOpsStatus: "የቅርብ ጊዜ የስራዎች ሁኔታ",
    viewAll: "ሁሉንም ይመልከቱ",
    creditAccountsTitle: "የባፍስ የብድር ሂሳቦች",
    creditSubtitle: "ከኤክሴል ሰነድ የተወሰደ የፋይናንስ መረጃ",
    combinedBalance: "ጠቅላላ የሚገኝ ቀሪ ሂሳብ",
    accountsListed: "የተመዘገቡ ሂሳቦች",
    searchCreditPlaceholder: "የሂሳብ ቁጥር ወይም ባንክ ይፈልጉ...",
    transportOpsTitle: "የትራንስፖርት ስራዎች",
    opsSubtitle: "ጭነቶችን እና የመኪና ቦታዎችን ያስ hisዱ",
    searchOpsPlaceholder: "በሰሌዳ፣ በሹፌር፣ በመዳረሻ ይፈልጉ...",
    dispatchNew: "አዲስ ትራንስፖርት መድብ",
    dispatchSubtitle: "አዲስ ጭነት መዝግብ እና የነዳጅ አበል መድብ",
    plateNumber: "የመኪና የሰሌዳ ቁጥር",
    driverName: "የሹፌሩ ሙሉ ስም",
    driverPhone: "የሹፌሩ ስልክ ቁጥር",
    cargoType: "የጭነቱ ዓይነት",
    cargoWeight: "የጭነቱ ክብደት (በቶን)",
    originPoint: "መነሻ ቦታ",
    destinationPoint: "መድረሻ ቦታ",
    linkedAccount: "የተያያዘው የባፍስ ሂሳብ",
    selectAccount: "-- የባፍስ ሂሳብ ይምረጡ --",
    fuelAllowance: "የነዳጅ አበል (ብር)",
    etaDate: "የሚደርስበት ቀን (ETA)",
    confirmDispatch: "አስመዝግብ እና አሰማራ",
    guideTitle: "ለጀማሪዎች ነፃ የማዘጋጃ መመሪያ",
    guideSubtitle: "በነፃ አስተናግደው ከቴሌግራም ቦት ጋር እንዴት እንደሚያያዝ",
    navDashboard: "ዳሽቦርድ",
    navCredits: "ብድሮች",
    navOps: "ስራዎች",
    navDispatch: "መድብ",
    navGuide: "መመሪያ",
    statusPending: "በመጠበቅ ላይ",
    statusInTransit: "በመጓጓዝ ላይ",
    statusCustoms: "ጉምሩክ የተለቀቀ",
    statusDelivered: "ደርሷል",
    bankCBE: "የኢትዮጵያ ንግድ ባንክ",
    bankDashen: "ዳሽን ባንክ",
    bankAwash: "አዋሽ ባንክ",
    bankAbyssinia: "አቢሲኒያ ባንክ",
    copy: "ቅዳ",
    copied: "ተቀድቷል!",
    statusUpdateModal: "የስራ ሁኔታ ያሻሽሉ",
    currentLocation: "አሁን የሚገኝበት ቦታ",
    saveChanges: "ለውጦችን አስቀምጥ",
    addAccountModal: "የባፍስ የብድር ሂሳብ ጨምር",
    selectBank: "የባንኩ ስም",
    accountNumber: "የሂሳብ ቁጥር",
    creditAmount: "የብድር መጠን (ብር)",
    addAccountBtn: "ሂሳብ ጨምር",
    resetBtn: "ውሂብ መልስ"
  }
};

const DEFAULT_CREDIT_ACCOUNTS = [
  { id: 'ca-1', accountNumber: '1000010277427', bankName: 'Commercial Bank of Ethiopia', amount: 67595.87, status: 'Active', lastUpdated: '2026-09-20' },
  { id: 'ca-2', accountNumber: '1000591321707', bankName: 'Commercial Bank of Ethiopia', amount: 11000.00, status: 'Active', lastUpdated: '2026-09-21' },
  { id: 'ca-3', accountNumber: '1000597909512', bankName: 'Dashen Bank', amount: 24000.34, status: 'Active', lastUpdated: '2026-09-22' },
  { id: 'ca-4', accountNumber: '1000341129088', bankName: 'Awash Bank', amount: 154500.00, status: 'Active', lastUpdated: '2026-09-18' },
  { id: 'ca-5', accountNumber: '1000882194012', bankName: 'Bank of Abyssinia', amount: 48900.50, status: 'Active', lastUpdated: '2026-09-23' }
];

const DEFAULT_OPERATIONS = [
  {
    id: 'TRP-8801',
    plateNumber: '3-45891 ET',
    driverName: 'አበበ ቢቂላ (Abebe Bikila)',
    driverPhone: '+251 91 123 4567',
    cargoType: 'Fertilizer (ማዳበሪያ)',
    cargoWeight: '32',
    origin: 'Djibouti Port',
    destination: 'Mojo Dry Port',
    status: 'In Transit',
    currentLocation: 'Awash Arba (አዋሽ አርባ)',
    creditAccountId: 'ca-1',
    creditAccountNum: '1000010277427',
    fuelAllowance: 18500.00,
    eta: '2026-09-26',
    createdDate: '2026-09-22'
  },
  {
    id: 'TRP-8802',
    plateNumber: '3-89102 ET',
    driverName: 'ከበደ ተሰማ (Kebede Tessema)',
    driverPhone: '+251 92 345 6789',
    cargoType: 'Steel Rebar Rods (የብረት ዘንግ)',
    cargoWeight: '40',
    origin: 'Djibouti Corridor',
    destination: 'Kality Industrial Zone',
    status: 'Customs Cleared',
    currentLocation: 'Galafi Border (ገላፊ መውጫ)',
    creditAccountId: 'ca-4',
    creditAccountNum: '1000341129088',
    fuelAllowance: 22000.00,
    eta: '2026-09-27',
    createdDate: '2026-09-21'
  },
  {
    id: 'TRP-8803',
    plateNumber: '3-10293 ET',
    driverName: 'ሙሉጌታ አለሙ (Mulugeta Alemu)',
    driverPhone: '+251 93 456 7890',
    cargoType: 'Wheat Grain Containers (ስንዴ)',
    cargoWeight: '28',
    origin: 'Nazret / Adama Depot',
    destination: 'Hawassa Terminal',
    status: 'Delivered',
    currentLocation: 'Hawassa Terminal (ሀዋሳ)',
    creditAccountId: 'ca-3',
    creditAccountNum: '1000597909512',
    fuelAllowance: 12500.00,
    eta: '2026-09-24',
    createdDate: '2026-09-19'
  },
  {
    id: 'TRP-8804',
    plateNumber: '3-67123 ET',
    driverName: 'ዳዊት ዮሐንስ (Dawit Yohannes)',
    driverPhone: '+251 94 567 8901',
    cargoType: 'Industrial Machinery (የፋብሪካ ዕቃዎች)',
    cargoWeight: '15',
    origin: 'Mojo Dry Port',
    destination: 'Kombolcha Industrial Park',
    status: 'Pending',
    currentLocation: 'Mojo Warehouse 4',
    creditAccountId: 'ca-5',
    creditAccountNum: '1000882194012',
    fuelAllowance: 16000.00,
    eta: '2026-09-29',
    createdDate: '2026-09-24'
  }
];

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'am'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tgUser, setTgUser] = useState(null);
  
  const [creditAccounts, setCreditAccounts] = useState(() => {
    const saved = localStorage.getItem('bafs_credit_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_CREDIT_ACCOUNTS;
  });
  
  const [operations, setOperations] = useState(() => {
    const saved = localStorage.getItem('bafs_operations');
    return saved ? JSON.parse(saved) : DEFAULT_OPERATIONS;
  });

  // Filter & Search states
  const [opSearch, setOpSearch] = useState('');
  const [opStatusFilter, setOpStatusFilter] = useState('All');
  const [creditSearch, setCreditSearch] = useState('');

  // Modals state
  const [selectedOp, setSelectedOp] = useState(null);
  const [isNewCreditModalOpen, setIsNewCreditModalOpen] = useState(false);
  const [statusUpdateOp, setStatusUpdateOp] = useState(null);

  // Form state for new operation
  const [newOp, setNewOp] = useState({
    plateNumber: '',
    driverName: '',
    driverPhone: '',
    cargoType: '',
    cargoWeight: '',
    origin: 'Djibouti Port',
    destination: 'Addis Ababa (Kality)',
    creditAccountId: '',
    fuelAllowance: '',
    eta: ''
  });

  // Form state for new credit account
  const [newCredit, setNewCredit] = useState({
    accountNumber: '',
    bankName: 'Commercial Bank of Ethiopia',
    amount: ''
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('bafs_credit_accounts', JSON.stringify(creditAccounts));
  }, [creditAccounts]);

  useEffect(() => {
    localStorage.setItem('bafs_operations', JSON.stringify(operations));
  }, [operations]);

  useEffect(() => {
    // Telegram WebApp Initialization
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setTgUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  const triggerHaptic = (type = 'impact', style = 'medium') => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      } else if (type === 'notification') {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(style);
      }
    }
  };

  const totalCreditAmount = useMemo(() => {
    return creditAccounts.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  }, [creditAccounts]);

  const stats = useMemo(() => {
    const totalOps = operations.length;
    const active = operations.filter(o => o.status === 'In Transit' || o.status === 'Customs Cleared').length;
    const delivered = operations.filter(o => o.status === 'Delivered').length;
    const pending = operations.filter(o => o.status === 'Pending').length;
    const totalFuel = operations.reduce((sum, o) => sum + Number(o.fuelAllowance || 0), 0);
    return { totalOps, active, delivered, pending, totalFuel };
  }, [operations]);

  const formatETB = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2
    }).format(amount).replace('ETB', 'ብር ');
  };

  const translateStatus = (st) => {
    switch (st) {
      case 'Pending': return t.statusPending;
      case 'In Transit': return t.statusInTransit;
      case 'Customs Cleared': return t.statusCustoms;
      case 'Delivered': return t.statusDelivered;
      default: return st;
    }
  };

  const handleAddOperation = (e) => {
    e.preventDefault();
    if (!newOp.plateNumber || !newOp.driverName || !newOp.fuelAllowance) {
      alert(lang === 'am' ? 'እባክዎ ሁሉንም አስፈላጊ መረጃዎች ይሙሉ።' : 'Please fill out all required fields.');
      return;
    }
    triggerHaptic('notification', 'success');

    const selectedAcc = creditAccounts.find(a => a.id === newOp.creditAccountId);

    const created = {
      id: `TRP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newOp,
      fuelAllowance: parseFloat(newOp.fuelAllowance),
      creditAccountNum: selectedAcc ? selectedAcc.accountNumber : 'N/A',
      status: 'Pending',
      currentLocation: newOp.origin,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setOperations([created, ...operations]);
    
    setNewOp({
      plateNumber: '',
      driverName: '',
      driverPhone: '',
      cargoType: '',
      cargoWeight: '',
      origin: 'Djibouti Port',
      destination: 'Addis Ababa (Kality)',
      creditAccountId: '',
      fuelAllowance: '',
      eta: ''
    });
    setActiveTab('operations');
  };

  const handleAddCredit = (e) => {
    e.preventDefault();
    if (!newCredit.accountNumber || !newCredit.amount) {
      alert(lang === 'am' ? 'ትክክለኛ የሂሳብ ቁጥር እና መጠን ያስገቡ' : 'Please provide valid Account Number and Amount');
      return;
    }
    triggerHaptic('notification', 'success');

    const accountObj = {
      id: `ca-${Date.now()}`,
      accountNumber: newCredit.accountNumber.trim(),
      bankName: newCredit.bankName,
      amount: parseFloat(newCredit.amount),
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setCreditAccounts([accountObj, ...creditAccounts]);
    setNewCredit({ accountNumber: '', bankName: 'Commercial Bank of Ethiopia', amount: '' });
    setIsNewCreditModalOpen(false);
  };

  const handleUpdateStatus = (id, newStatus, newLoc) => {
    triggerHaptic('impact', 'light');
    setOperations(operations.map(op => {
      if (op.id === id) {
        return { 
          ...op, 
          status: newStatus, 
          currentLocation: newLoc || op.currentLocation 
        };
      }
      return op;
    }));
    setStatusUpdateOp(null);
  };

  const handleDeleteOp = (id) => {
    if (confirm(lang === 'am' ? 'ይህንን የትራንስፖርት መረጃ ለማስወገድ እርግጠኛ ነዎት?' : 'Are you sure you want to delete this transport record?')) {
      triggerHaptic('notification', 'warning');
      setOperations(operations.filter(op => op.id !== id));
      if (selectedOp && selectedOp.id === id) setSelectedOp(null);
    }
  };

  const resetDataToDefault = () => {
    if (confirm(lang === 'am' ? 'ሁሉንም መረጃ ወደ ነባሪው የባፍስ መረጃ ለመመለስ ይፈልጋሉ?' : 'Reset all operational & credit data back to default BAFS records?')) {
      setCreditAccounts(DEFAULT_CREDIT_ACCOUNTS);
      setOperations(DEFAULT_OPERATIONS);
      localStorage.removeItem('bafs_credit_accounts');
      localStorage.removeItem('bafs_operations');
      triggerHaptic('notification', 'success');
    }
  };

  // Filtered views
  const filteredOps = operations.filter(op => {
    const matchesSearch = 
      op.plateNumber.toLowerCase().includes(opSearch.toLowerCase()) ||
      op.driverName.toLowerCase().includes(opSearch.toLowerCase()) ||
      op.id.toLowerCase().includes(opSearch.toLowerCase()) ||
      op.destination.toLowerCase().includes(opSearch.toLowerCase());
    
    const matchesStatus = opStatusFilter === 'All' || op.status === opStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCredits = creditAccounts.filter(acc => 
    acc.accountNumber.includes(creditSearch) ||
    acc.bankName.toLowerCase().includes(creditSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-24 select-none">
      
      {}
      <header className="bg-slate-800/95 backdrop-blur border-b border-slate-700/80 sticky top-0 z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-slate-950 shadow-md shadow-amber-500/20">
              BAFS
            </div>
            <div>
              <h1 className="font-bold text-xs sm:text-sm tracking-wide text-slate-100 flex items-center gap-1.5">
                {t.title}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h1>
              <p className="text-[11px] text-amber-400 font-medium">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bilingual Switch Button */}
            <button
              onClick={() => {
                triggerHaptic('impact', 'medium');
                setLang(lang === 'en' ? 'am' : 'en');
              }}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-650 border border-slate-600 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 transition active:scale-95"
            >
              <Globe size={14} />
              <span>{lang === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">

        {/* ================= DASHBOARD TAB ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            
            {/* Quick Greeting */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{t.welcome}</p>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {tgUser ? `ሰላም ${tgUser.first_name} 👋` : t.welcome}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">{t.dashOverview}</p>
              </div>
              <button 
                onClick={resetDataToDefault}
                className="p-2 text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition border border-slate-600 flex items-center gap-1"
                title="Reset Sample Data"
              >
                <RefreshCw size={14} />
                <span className="hidden sm:inline">{t.resetBtn}</span>
              </button>
            </div>

            {/* Top KPI Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 border border-slate-700/70 p-3.5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{t.totalCreditPool}</span>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <CreditCard size={18} />
                  </div>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-emerald-400 mt-2 truncate">
                  {formatETB(totalCreditAmount)}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{creditAccounts.length} {t.bafsBankAccounts}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-3.5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{t.activeShipments}</span>
                  <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Truck size={18} />
                  </div>
                </div>
                <p className="text-lg font-extrabold text-amber-400 mt-2">
                  {stats.active} <span className="text-xs text-slate-400 font-normal">/ {stats.totalOps}</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{stats.pending} {translateStatus('Pending')}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-3.5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{t.deliveredJobs}</span>
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                    <CheckCircle size={18} />
                  </div>
                </div>
                <p className="text-lg font-extrabold text-blue-400 mt-2">{stats.delivered}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.completedTrips}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-3.5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{t.fuelAllocations}</span>
                  <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
                    <DollarSign size={18} />
                  </div>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-purple-300 mt-2 truncate">
                  {formatETB(stats.totalFuel)}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.totalDisbursed}</p>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { triggerHaptic(); setActiveTab('add_op'); }}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition active:scale-95"
              >
                <PlusCircle size={18} />
                <span className="text-xs">{t.dispatchTruck}</span>
              </button>

              <button
                onClick={() => { triggerHaptic(); setIsNewCreditModalOpen(true); }}
                className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold py-3 px-4 rounded-xl border border-slate-700 transition active:scale-95"
              >
                <CreditCard size={18} className="text-amber-400" />
                <span className="text-xs">{t.addCreditLine}</span>
              </button>
            </div>

            {/* Recent Transport Operations List */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                  <Clock size={16} className="text-amber-400" />
                  {t.recentOpsStatus}
                </h3>
                <button 
                  onClick={() => { triggerHaptic(); setActiveTab('operations'); }}
                  className="text-xs text-amber-400 hover:underline flex items-center"
                >
                  {t.viewAll} <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {operations.slice(0, 3).map((op) => (
                  <div 
                    key={op.id}
                    onClick={() => { triggerHaptic(); setSelectedOp(op); }}
                    className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 hover:border-amber-500/50 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-amber-400">{op.id}</span>
                        <span className="text-xs font-semibold text-slate-200">| {op.plateNumber}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {op.origin} <ArrowRight size={10} className="text-slate-500" /> {op.destination}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        op.status === 'In Transit' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        op.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        op.status === 'Customs Cleared' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {translateStatus(op.status)}
                      </span>
                      <p className="text-[11px] font-medium text-slate-400">{formatETB(op.fuelAllowance)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= CREDIT ACCOUNTS TAB ================= */}
        {activeTab === 'credits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-100">{t.creditAccountsTitle}</h2>
                <p className="text-xs text-slate-400">{t.creditSubtitle}</p>
              </div>
              <button
                onClick={() => { triggerHaptic(); setIsNewCreditModalOpen(true); }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow"
              >
                <PlusCircle size={14} />
                + {t.addCreditLine}
              </button>
            </div>

            {/* Total Balance Summary Header */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-slate-800 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-300 font-medium">{t.combinedBalance}</p>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{formatETB(totalCreditAmount)}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">{filteredCredits.length} {t.accountsListed}</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder={t.searchCreditPlaceholder}
                value={creditSearch}
                onChange={(e) => setCreditSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Accounts Cards List */}
            <div className="space-y-3">
              {filteredCredits.map((acc) => (
                <div key={acc.id} className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-3 hover:border-slate-600 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">
                        {acc.bankName}
                      </span>
                      <h4 className="font-mono text-sm sm:text-base font-bold text-slate-100 mt-1">
                        {acc.accountNumber}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {acc.status}
                    </span>
                  </div>

                  <div className="flex items-end justify-between border-t border-slate-700/50 pt-2.5">
                    <div>
                      <p className="text-[11px] text-slate-400">{t.combinedBalance}</p>
                      <p className="text-base sm:text-lg font-black text-emerald-400">{formatETB(acc.amount)}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`Account: ${acc.accountNumber} | Amount: ETB ${acc.amount}`);
                        triggerHaptic('notification', 'success');
                        alert(`${acc.accountNumber} ${t.copied}`);
                      }}
                      className="p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Copy size={12} />
                      <span className="text-[11px]">{t.copy}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TRANSPORT OPERATIONS TAB ================= */}
        {activeTab === 'operations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-100">{t.transportOpsTitle}</h2>
                <p className="text-xs text-slate-400">{t.opsSubtitle}</p>
              </div>
              <button
                onClick={() => { triggerHaptic(); setActiveTab('add_op'); }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow"
              >
                <PlusCircle size={14} />
                {t.navDispatch}
              </button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder={t.searchOpsPlaceholder}
                  value={opSearch}
                  onChange={(e) => setOpSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['All', 'Pending', 'In Transit', 'Customs Cleared', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => { triggerHaptic('impact', 'light'); setOpStatusFilter(st); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      opStatusFilter === st
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {st === 'All' ? (lang === 'am' ? 'ሁሉም' : 'All') : translateStatus(st)}
                  </button>
                ))}
              </div>
            </div>

            {/* Operations Cards List */}
            <div className="space-y-3">
              {filteredOps.map((op) => (
                <div 
                  key={op.id}
                  className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-3 hover:border-amber-500/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-amber-400 text-xs sm:text-sm">{op.id}</span>
                        <span className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                          {op.plateNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold mt-1">
                        {op.cargoType} {op.cargoWeight && `(${op.cargoWeight} Tons)`}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      op.status === 'In Transit' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      op.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      op.status === 'Customs Cleared' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {translateStatus(op.status)}
                    </span>
                  </div>

                  {/* Route & Driver */}
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/40 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400 flex items-center gap-1"><MapPin size={12} /> Route:</span>
                      <span className="font-medium">{op.origin} ➔ {op.destination}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400 flex items-center gap-1"><User size={12} /> {t.driverName}:</span>
                      <span className="font-medium">{op.driverName}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">{t.currentLocation}:</span>
                      <span className="font-bold text-amber-300">{op.currentLocation}</span>
                    </div>
                  </div>

                  {/* Operational Footer Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[10px] text-slate-400">{t.fuelAllowance}</p>
                      <p className="text-xs font-bold text-emerald-400">{formatETB(op.fuelAllowance)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => { triggerHaptic(); setStatusUpdateOp(op); }}
                        className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs rounded-lg flex items-center gap-1 transition"
                      >
                        <Edit3 size={12} /> {lang === 'am' ? 'ሁኔታ' : 'Status'}
                      </button>
                      <button
                        onClick={() => { triggerHaptic(); setSelectedOp(op); }}
                        className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-xs rounded-lg flex items-center gap-1 transition"
                      >
                        {lang === 'am' ? 'ዝርዝር' : 'Details'}
                      </button>
                      <button
                        onClick={() => handleDeleteOp(op.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ADD OPERATION FORM TAB ================= */}
        {activeTab === 'add_op' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100">{t.dispatchNew}</h2>
              <p className="text-xs text-slate-400">{t.dispatchSubtitle}</p>
            </div>

            <form onSubmit={handleAddOperation} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">{t.plateNumber} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3-45891 ET"
                  value={newOp.plateNumber}
                  onChange={(e) => setNewOp({ ...newOp, plateNumber: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.driverName} *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newOp.driverName}
                    onChange={(e) => setNewOp({ ...newOp, driverName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.driverPhone}</label>
                  <input
                    type="text"
                    placeholder="+251 9..."
                    value={newOp.driverPhone}
                    onChange={(e) => setNewOp({ ...newOp, driverPhone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.cargoType}</label>
                  <input
                    type="text"
                    placeholder="e.g. Fertilizer, Steel, Wheat"
                    value={newOp.cargoType}
                    onChange={(e) => setNewOp({ ...newOp, cargoType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.cargoWeight}</label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    value={newOp.cargoWeight}
                    onChange={(e) => setNewOp({ ...newOp, cargoWeight: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.originPoint}</label>
                  <select
                    value={newOp.origin}
                    onChange={(e) => setNewOp({ ...newOp, origin: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Djibouti Port">Djibouti Port (ጅቡቲ துறை)</option>
                    <option value="Mojo Dry Port">Mojo Dry Port (ሞጆ)</option>
                    <option value="Nazret / Adama">Nazret / Adama (አዳማ)</option>
                    <option value="Addis Ababa">Addis Ababa (አዲስ አበባ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.destinationPoint}</label>
                  <select
                    value={newOp.destination}
                    onChange={(e) => setNewOp({ ...newOp, destination: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Addis Ababa (Kality)">Addis Ababa Kality (ቃሊቲ)</option>
                    <option value="Mojo Dry Port">Mojo Dry Port (ሞጆ)</option>
                    <option value="Hawassa Terminal">Hawassa Terminal (ሀዋሳ)</option>
                    <option value="Kombolcha Industrial">Kombolcha (ኮምቦልቻ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{t.linkedAccount} *</label>
                <select
                  required
                  value={newOp.creditAccountId}
                  onChange={(e) => setNewOp({ ...newOp, creditAccountId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="">{t.selectAccount}</option>
                  {creditAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.accountNumber} ({acc.bankName} - ብር {acc.amount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.fuelAllowance} *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newOp.fuelAllowance}
                    onChange={(e) => setNewOp({ ...newOp, fuelAllowance: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t.etaDate}</label>
                  <input
                    type="date"
                    value={newOp.eta}
                    onChange={(e) => setNewOp({ ...newOp, eta: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition active:scale-98 text-xs flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {t.confirmDispatch}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= BEGINNER FREE DEPLOYMENT GUIDE TAB ================= */}
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/40 to-slate-800 border border-blue-500/30 rounded-2xl p-4">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <BookOpen size={18} className="text-blue-400" />
                {t.guideTitle}
              </h2>
              <p className="text-xs text-slate-300 mt-1">{t.guideSubtitle}</p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="font-bold text-xs text-slate-100">Bot setup via @BotFather</h3>
                </div>
                <p className="text-[11px] text-slate-400 pl-8">
                  Search for <strong>@BotFather</strong> on Telegram, send <code className="bg-slate-900 px-1 rounded text-amber-400">/newbot</code>, give it a name (e.g., BAFS Transport Bot).
                </p>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-bold text-xs text-slate-100">Deploy code on Vercel or GitHub Pages</h3>
                </div>
                <p className="text-[11px] text-slate-400 pl-8">
                  Host this Single File Mini App on Vercel (Free). Copy your HTTPS production URL.
                </p>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-bold text-xs text-slate-100">Connect WebApp Button</h3>
                </div>
                <p className="text-[11px] text-slate-400 pl-8">
                  In @BotFather ➔ Bot Settings ➔ Menu Button ➔ Configure Menu Button ➔ Paste your HTTPS Vercel URL.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      {selectedOp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400">{selectedOp.id}</span>
                <h3 className="text-base font-extrabold text-white">{selectedOp.plateNumber}</h3>
              </div>
              <button 
                onClick={() => setSelectedOp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div>
                  <p className="text-slate-400 text-[10px]">Status</p>
                  <p className="font-bold text-amber-400">{translateStatus(selectedOp.status)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">{t.cargoType}</p>
                  <p className="font-semibold text-slate-200">{selectedOp.cargoType}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">{t.currentLocation}</p>
                  <p className="font-semibold text-slate-200">{selectedOp.currentLocation}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">{t.etaDate}</p>
                  <p className="font-semibold text-slate-200">{selectedOp.eta || 'N/A'}</p>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
                <p className="text-slate-400 text-[10px]">{t.driverName}</p>
                <p className="font-bold text-slate-100">{selectedOp.driverName}</p>
                <p className="text-slate-300 font-mono flex items-center gap-1">
                  <Phone size={12} className="text-amber-400" /> {selectedOp.driverPhone}
                </p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
                <p className="text-slate-400 text-[10px]">{t.linkedAccount}</p>
                <p className="text-slate-200">Account #: <span className="font-mono font-bold text-amber-300">{selectedOp.creditAccountNum}</span></p>
                <p className="text-slate-200">{t.fuelAllowance}: <span className="font-bold text-emerald-400">{formatETB(selectedOp.fuelAllowance)}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 px-2 py-2 z-40">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          <button
            onClick={() => { triggerHaptic('impact', 'light'); setActiveTab('dashboard'); }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'dashboard' ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-[10px] mt-1">{t.navDashboard}</span>
          </button>

          <button
            onClick={() => { triggerHaptic('impact', 'light'); setActiveTab('credits'); }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'credits' ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard size={18} />
            <span className="text-[10px] mt-1">{t.navCredits}</span>
          </button>

          <button
            onClick={() => { triggerHaptic('impact', 'light'); setActiveTab('operations'); }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'operations' ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck size={18} />
            <span className="text-[10px] mt-1">{t.navOps}</span>
          </button>

          <button
            onClick={() => { triggerHaptic('impact', 'light'); setActiveTab('add_op'); }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'add_op' ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle size={18} />
            <span className="text-[10px] mt-1">{t.navDispatch}</span>
          </button>

          <button
            onClick={() => { triggerHaptic('impact', 'light'); setActiveTab('guide'); }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'guide' ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={18} />
            <span className="text-[10px] mt-1">{t.navGuide}</span>
          </button>
        </div>
      </nav>

    </div>
  );
}