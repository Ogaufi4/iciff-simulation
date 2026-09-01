'use client';

import { useState } from 'react';

type Portal = 'registry' | 'sanctions';
type RegistryView = 'search' | 'company';
type CompanySection = 'General Details' | 'Addresses' | 'Directors' | 'Shareholders' | 'Share Allocations' | 'Beneficial Owners' | 'Filings';

const companies = [
  { name: 'Kalahari DMC Botswana Proprietary Limited', number: 'BW00002673304', kind: 'Private company', place: 'Maun', registered: '24 November 2020', address: 'Office 8 Pumpkin Patch, Newtown, Maun, Botswana' },
  { name: 'Kalahari Wilderness Trails Proprietary Limited', number: 'BW00001165317', kind: 'Private company', place: 'Maun', registered: '12 April 2019', address: 'Plot 537, Mophane Avenue, Maun, Botswana' },
  { name: 'Kalahari Vleis Trading Store', number: 'BN00004498311', kind: 'Business name', place: 'Lehututu', registered: '08 February 2024', address: 'Mabote Ward, Lehututu, Botswana' },
];

const candidates = [
  { name: 'JOHN, Damien Patrick', type: 'Individual', programme: 'TRADE-ALPHA', list: 'Sanctions', score: 94, detail: 'Name and nationality match; date of birth differs by 11 years.' },
  { name: 'JONI, Damion', type: 'Individual', programme: 'PEP-AFRICA', list: 'PEP', score: 81, detail: 'Alias similarity and jurisdiction match; identifier unavailable.' },
  { name: 'JOHNSEN MERIDIAN HOLDINGS', type: 'Entity', programme: 'INTERNAL-02', list: 'Watchlist', score: 63, detail: 'Partial name match only; entity type conflicts with subject.' },
];

export function InvestigationLab() {
  const [portal, setPortal] = useState<Portal>('registry');
  const [registryView, setRegistryView] = useState<RegistryView>('search');
  const [section, setSection] = useState<CompanySection>('Beneficial Owners');
  const [query, setQuery] = useState('Kalahari');
  const [searched, setSearched] = useState(true);
  const [sanctionsName, setSanctionsName] = useState('John');
  const [sanctionsSearched, setSanctionsSearched] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [evidence, setEvidence] = useState(3);

  const openRegistry = () => { setPortal('registry'); setRegistryView('search'); };
  const openSanctions = () => setPortal('sanctions');

  return <main className="app">
    <div className="training">TRAINING SIMULATION — NOT A LIVE SYSTEM · ALL RECORDS AND LISTINGS ARE FICTIONAL</div>
    <header className="top"><div className="brand">IF</div><div><p className="overline">ICiFF SIMULATION LAB</p><h1>Kgale Water Infrastructure Case</h1></div><div className="stats"><span><b>68%</b> progress</span><span><b>31:42</b> active</span><button>ND</button></div></header>
    <div className="workspace">
      <aside className="rail"><p>CASEWORK</p>{['Brief','Search','Network','Transactions','Documents','Screening','Evidence','Decision'].map((x,i)=><button key={x} onClick={x==='Screening'?openSanctions:x==='Search'?openRegistry:undefined} className={(portal==='sanctions'&&x==='Screening')||(portal==='registry'&&x==='Search')?'active':''}><i>{String(i+1).padStart(2,'0')}</i>{x}</button>)}<small>● &nbsp; Autosaved</small></aside>
      <section className="browser">
        <div className="tabbar"><div className="dots">● ● ●</div><button onClick={openRegistry} className={portal==='registry'?'selected':''}>Corporate registry <span>×</span></button><button onClick={openSanctions} className={portal==='sanctions'?'selected':''}>Sanctions screening <span>×</span></button><button className="plus">＋</button></div>
        <div className="toolbar"><button>‹</button><button>›</button><button>↻</button><div className="address">◇ &nbsp; https://{portal==='registry'?'cipa-registry.test':'sanctions-screen.test'}</div><button>☆</button><button>⋮</button></div>
        {portal==='registry' ? <RegistryPortal view={registryView} setView={setRegistryView} query={query} setQuery={setQuery} searched={searched} setSearched={setSearched} section={section} setSection={setSection} saveEvidence={()=>setEvidence(x=>x+1)}/> : <SanctionsPortal name={sanctionsName} setName={setSanctionsName} searched={sanctionsSearched} setSearched={setSanctionsSearched} selected={selectedCandidate} setSelected={setSelectedCandidate} saveEvidence={()=>setEvidence(x=>x+1)}/>} 
      </section>
      <aside className="evidence"><header><div><p className="overline">EVIDENCE NOTEBOOK</p><h2>{evidence} saved items</h2></div><button>—</button></header><Evidence tag="REGISTRY" title="Ownership declaration">Naledi Tiro is declared as the 48% indirect beneficial owner.</Evidence><Evidence tag="SCREENING" title="Candidate requires resolution">A high-scoring name match contains conflicting identity attributes.</Evidence><Evidence tag="PAYMENT" title="Beneficiary mismatch">Receiving account is associated with another company.</Evidence><button className="add">＋ Add investigation note</button><div className="objective"><b>Current objective <span>3 of 5 checks</span></b><p>Establish ownership and resolve every screening candidate.</p><i><b/></i></div></aside>
    </div>
  </main>;
}

function RegistryPortal({view,setView,query,setQuery,searched,setSearched,section,setSection,saveEvidence}:{view:RegistryView;setView:(v:RegistryView)=>void;query:string;setQuery:(v:string)=>void;searched:boolean;setSearched:(v:boolean)=>void;section:CompanySection;setSection:(v:CompanySection)=>void;saveEvidence:()=>void}){
  return <div className="portal registry-portal"><div className="portal-alert">BOTSWANA CORPORATE REGISTRY <b>TRAINING PORTAL</b></div><header className="portal-head"><div className="seal">BR</div><div><p>BUSINESS RECORDS SIMULATION</p><h2>Botswana Corporate Registry</h2></div><nav><button onClick={()=>setView('search')}>Home</button><button onClick={()=>setView('search')}>Search</button><button>Help</button></nav></header>
    {view==='search'?<div className="registry-page"><h2 className="page-title">Search the Register</h2><div className="register-search"><select aria-label="Entity type"><option>Business entities</option><option>People and officers</option><option>Beneficial owners</option></select><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name or number"/><button onClick={()=>setSearched(true)}>Search</button></div><button className="advanced">› Advanced search</button>{searched&&<><div className="result-title"><h2>Search Results</h2><span>{companies.length} fictional records</span></div><div className="result-controls">Results per page <select><option>20</option></select><span>Page 1</span><span className="sort">Sort by <select><option>Best match</option><option>Name</option></select></span></div>{companies.map((c,i)=><article className="company-result" key={c.number}><button className="company-link" onClick={()=>{setView('company');setSection('Beneficial Owners')}}>{c.name} ({c.number})</button><p>Registered　|　Companies　|　{c.kind}　|　Registered on {c.registered}</p><p>{c.address}</p>{i<2&&<><button className="history-link">⌄ Previous names</button><small>{i===0?'Kalahari Culture and Nature Safaris Proprietary Limited':'Kalahari Wilderness Trail Proprietary Limited'}</small></>}</article>)}</>}</div>:
    <CompanyRecord section={section} setSection={setSection} back={()=>setView('search')} saveEvidence={saveEvidence}/>}</div>;
}

function CompanyRecord({section,setSection,back,saveEvidence}:{section:CompanySection;setSection:(v:CompanySection)=>void;back:()=>void;saveEvidence:()=>void}){
  const sections:CompanySection[]=['General Details','Addresses','Directors','Shareholders','Share Allocations','Beneficial Owners','Filings'];
  return <div className="company-page"><button className="back" onClick={back}>← Back to results</button><header><h2>Kalahari DMC Botswana Proprietary Limited <span>(BW00002673304)</span></h2><div className="company-meta"><b>✓</b><span><small>Company status</small>Registered</span><span><small>Company type</small>Private Company</span></div></header><div className="record-tabs"><b>Company Details</b><span>Visualisation</span><span>Filings</span></div><div className="record-layout"><nav>{sections.map(x=><button className={section===x?'current':''} onClick={()=>setSection(x)} key={x}>{x}</button>)}</nav><section className="record-panel"><h2>{section}</h2>{section==='Beneficial Owners'?<><div className="declaration-status"><b>Declaration BO-2026-184</b><span>Self-declared · last amended 03 May 2026</span></div><BeneficialOwner name="Naledi Tiro" nationality="Botswana" address="P O Box 418, Tlokweng, Botswana" nature="Indirect shareholding and voting rights" appointing="Kalahari Projects Holdings (Pty) Ltd" percentage="48%" date="14 February 2026" state="Verification pending"/><BeneficialOwner name="Kabelo Moagi" nationality="Botswana" address="Plot 104, Broadhurst, Gaborone, Botswana" nature="Direct shareholding and significant influence" appointing="Self-appointed shareholder" percentage="22%" date="03 May 2026" state="Disputed"/><div className="ownership-path"><b>Ownership chain</b><p>Naledi Tiro <span>80%</span> Kalahari Projects Holdings <span>60%</span> Kalahari DMC Botswana</p><strong>0.80 × 0.60 = 48% indirect interest</strong></div><button className="save-record" onClick={saveEvidence}>Save ownership record as evidence</button></>:section==='Directors'?<><Owner name="Tshwarelo Kabatlhophane" share="Current director" control="Appointed 14 February 2026" state="Active"/><Owner name="Oratile Motsipole" share="Current director" control="Appointed 24 November 2020" state="Active"/></>:<div className="empty-section"><b>{section} record</b><p>This fictional section contains registry data supplied by the assigned scenario.</p></div>}</section></div></div>;
}

function Owner({name,share,control,state}:{name:string;share:string;control:string;state:string}){return <article className="owner"><div className="avatar">{name.split(' ').map(x=>x[0]).join('')}</div><div><h3>{name}</h3><p>{share}</p><small>{control}</small></div><span>{state}</span></article>}

function BeneficialOwner({name,nationality,address,nature,appointing,percentage,date,state}:{name:string;nationality:string;address:string;nature:string;appointing:string;percentage:string;date:string;state:string}){
  const [open,setOpen]=useState(true);
  return <article className="beneficial-owner"><button className="owner-summary" onClick={()=>setOpen(!open)} aria-expanded={open}><span>{open?'⌃':'⌄'}</span><b>{name}</b><i>{state}</i></button>{open&&<div className="owner-details"><b>Nationalities</b><span>{nationality}</span><b>Postal address</b><span>{address}</span><h4>Interests</h4><i/><b>Nature of interest</b><span>{nature}</span><b>Appointing shareholder</b><span>{appointing}</span><b>Percentage owned or controlled</b><span className="percentage">{percentage}</span><b>Appointment date</b><span>{date}</span></div>}</article>
}

function SanctionsPortal({name,setName,searched,setSearched,selected,setSelected,saveEvidence}:{name:string;setName:(v:string)=>void;searched:boolean;setSearched:(v:boolean)=>void;selected:number|null;setSelected:(v:number|null)=>void;saveEvidence:()=>void}){
  return <div className="portal sanctions-portal"><div className="portal-alert sanctions-alert">INTERNATIONAL SANCTIONS SCREENING <b>TRAINING PORTAL</b></div><header className="sanctions-head"><div className="watch-mark">WS</div><div><p>FICTIONAL PUBLIC RECORD DATABASE</p><h2>International Sanctions Screening</h2></div><span>Rules for use　 List guide　 Print</span></header><div className="sanctions-page"><p className="sanctions-copy">Search fictional sanctions, PEP and watchlist profiles. A similarity score prioritises review and is not a final determination. Compare identity attributes before resolving a candidate.</p><section className="lookup"><header><b>Advanced lookup</b><span>SIMULATED DATA</span></header><div className="lookup-grid"><label>Entity type<select><option>All</option><option>Individual</option><option>Entity</option></select></label><label>Address<input/></label><label>Name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>City<input/></label><label>ID / Registration number<input/></label><label>Country<select><option>All</option><option>Botswana</option><option>South Africa</option></select></label><label>Programme<select><option>All programmes</option><option>TRADE-ALPHA</option><option>PEP-AFRICA</option></select></label><label>List<select><option>All lists</option><option>Sanctions</option><option>PEP</option><option>Watchlist</option></select></label><label className="score-label">Minimum match score<input type="range" min="40" max="100" defaultValue="60"/></label><div className="lookup-actions"><button onClick={()=>setSearched(true)}>Search</button><button onClick={()=>{setName('');setSearched(false)}}>Reset</button></div></div></section>{searched&&<section className="candidate-results"><header><b>Lookup results: {candidates.length} found</b><span>Explainable matching enabled</span></header><div className="candidate-row candidate-heading"><span>Name</span><span>Type</span><span>Programme</span><span>List</span><span>Score</span></div>{candidates.map((c,i)=><button className={'candidate-row '+(selected===i?'chosen':'')} key={c.name} onClick={()=>setSelected(i)}><span>{c.name}</span><span>{c.type}</span><span>{c.programme}</span><span>{c.list}</span><b>{c.score}</b></button>)}</section>}{selected!==null&&<section className="comparison"><header><div><p>CASE SUBJECT</p><h3>John Dambe</h3></div><div className="match-score"><b>{candidates[selected].score}</b><span>match score</span></div><div><p>CANDIDATE</p><h3>{candidates[selected].name}</h3></div></header><div className="attribute"><span>Name</span><b>Close match</b><span>Date of birth</span><b className="mismatch">Mismatch</b><span>Nationality</span><b>Match</b></div><p>{candidates[selected].detail}</p><div className="resolution"><button>True match</button><button>False positive</button><button>Unresolved — escalate</button><button className="save-record" onClick={saveEvidence}>Save comparison as evidence</button></div></section>}</div></div>;
}

function Evidence({tag,title,children}:{tag:string;title:string;children:React.ReactNode}){return <article className="card"><label className={tag.toLowerCase()}>{tag}</label><h3>{title}</h3><p>{children}</p><small>Saved in this attempt</small></article>}
