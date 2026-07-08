import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Home,
  ClipboardCheck,
  History as HistoryIcon,
  Camera,
  ScanLine,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  ShieldCheck,
  LogIn,
  LogOut,
  Car,
  GraduationCap,
  CreditCard,
  Check,
  X,
  Building2,
  User,
} from 'lucide-react-native';

const COLORS = {
  primary: '#084771',
  primaryDark: '#084771',
  primaryLight: '#808183',
  accent: '#AD9218',
  success: '#15803D',
  successBg: '#EAF7EE',
  danger: '#B91C1C',
  dangerBg: '#FCEBEA',
  background: '#F1F4F8',
  surface: '#FFFFFF',
  textDark: '#0F172A',
  textMuted: '#64748B',
  textFaint: '#94A3B8',
  border: '#E2E8F0',
  slateBg: '#F8FAFC',
  camBg: '#1E293B',
  camBorder: '#334155',
};

const appLogoPng = require('./assets/Logo.png');
const uceLogoPng = require('./assets/UCE.png');
const MONO_FONT = Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' });

/* ---------- Reusable pieces ---------- */

function PlateBadge({ plate, small }) {
  return (
    <View style={[styles.plateWrap, small && styles.plateWrapSm]}>
      <View style={[styles.plateFlag, small && styles.plateFlagSm]}>
        <Text style={styles.plateFlagText}>EC</Text>
      </View>
      <View style={[styles.plateBody, small && styles.plateBodySm]}>
        <Text style={[styles.plateText, small && styles.plateTextSm]}>{plate}</Text>
      </View>
    </View>
  );
}

function CameraSlot({ label, captured, onPress, imageUri }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.camSlot, captured && styles.camSlotCaptured]}
    >
      <View style={[styles.camCorner, styles.camCornerTL]} />
      <View style={[styles.camCorner, styles.camCornerTR]} />
      <View style={[styles.camCorner, styles.camCornerBL]} />
      <View style={[styles.camCorner, styles.camCornerBR]} />

      {captured ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.camThumb} />
          <View style={styles.camCheckBadge}>
            <CheckCircle2 size={16} color="#FFFFFF" />
          </View>
        </>
      ) : (
        <Camera size={30} color={COLORS.textFaint} />
      )}
      <Text style={styles.camLabel}>{label}</Text>
      <Text style={styles.camStatus}>{captured ? 'Capturada' : 'Toca para capturar'}</Text>
    </TouchableOpacity>
  );
}

function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View style={styles.headerBadge}>
          <Image 
          source={appLogoPng} 
          style={styles.headerLogo} 
          resizeMode="contain" 
        />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerEyebrow}>Universidad Central del Ecuador</Text>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <Image 
          source={uceLogoPng} 
          style={styles.uceLogo} 
          resizeMode="contain" 
        />
      </View>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
      <View style={styles.guardPill}>
        <User size={13} color={COLORS.accent} />
        <Text style={styles.guardPillText}>Guardia: C. Andrade</Text>
        <Text style={styles.guardDot}>•</Text>
        <Clock size={13} color={COLORS.accent} />
        <Text style={styles.guardPillText}>Turno 06:00–14:00</Text>
      </View>
    </View>
  );
}

function BottomNav({ activeTab, onChange }) {
  const tabs = [
    { key: 'control', label: 'Control', Icon: Home },
    { key: 'verificacion', label: 'Verificación', Icon: ClipboardCheck },
    { key: 'historial', label: 'Historial', Icon: HistoryIcon },
  ];
  return (
    <View style={styles.bottomNav}>
      {tabs.map(({ key, label, Icon }) => {
        const active = activeTab === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.navItem, active && styles.navItemActive]}
            onPress={() => onChange(key)}
            activeOpacity={0.7}
          >
            <Icon size={20} color={active ? COLORS.primary : COLORS.textFaint} />
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ---------- Sections ---------- */

function ControlSection({
  tipoMovimiento,
  setTipoMovimiento,
  fotoFrontal,
  fotoLateral,
  onToggleFrontal,
  onToggleLateral,
  placaInput,
  setPlacaInput,
  onScan,
}) {
  return (
    <View style={styles.sectionGap}>
      <View style={styles.segmentWrap}>
        <TouchableOpacity
          style={[styles.segmentBtn, tipoMovimiento === 'entrada' && styles.segmentBtnEntrada]}
          onPress={() => setTipoMovimiento('entrada')}
        >
          <LogIn size={16} color={tipoMovimiento === 'entrada' ? '#FFFFFF' : COLORS.textMuted} />
          <Text style={[styles.segmentText, tipoMovimiento === 'entrada' && styles.segmentTextActive]}>
            Entrada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, tipoMovimiento === 'salida' && styles.segmentBtnSalida]}
          onPress={() => setTipoMovimiento('salida')}
        >
          <LogOut size={16} color={tipoMovimiento === 'salida' ? '#FFFFFF' : COLORS.textMuted} />
          <Text style={[styles.segmentText, tipoMovimiento === 'salida' && styles.segmentTextActive]}>
            Salida
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.label}>Evidencia fotográfica</Text>
        <View style={styles.camRow}>
          <CameraSlot
            label="Foto Frontal"
            captured={fotoFrontal}
            onPress={onToggleFrontal}
            imageUri="https://placehold.co/300x300/1e293b/ffffff?text=Frontal"
          />
          <CameraSlot
            label="Foto Lateral"
            captured={fotoLateral}
            onPress={onToggleLateral}
            imageUri="https://placehold.co/300x300/1e293b/ffffff?text=Lateral"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Placa del vehículo</Text>
        <TextInput
          value={placaInput}
          onChangeText={(t) => setPlacaInput(t.toUpperCase())}
          placeholder="PBX-1234"
          placeholderTextColor={COLORS.textFaint}
          autoCapitalize="characters"
          style={styles.plateInput}
        />
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={onScan} activeOpacity={0.85}>
        <ScanLine size={20} color="#FFFFFF" />
        <Text style={styles.scanButtonText}>Escanear Placa / Buscar Vehículo</Text>
      </TouchableOpacity>

      <View style={styles.noticeBox}>
        <ShieldCheck size={16} color="#B45309" />
        <Text style={styles.noticeText}>
          Capture ambas fotografías antes de registrar el ingreso o salida del vehículo.
        </Text>
      </View>
    </View>
  );
}

function VerificationSection({
  vehiculo,
  pagado,
  onTogglePagado,
  familiares,
  onToggleFamiliar,
  decision,
  onDecision,
}) {
  return (
    <View style={styles.sectionGap}>
      {decision && (
        <View style={[styles.decisionBanner, decision === 'autorizado' ? styles.bgSuccess : styles.bgDanger]}>
          {decision === 'autorizado' ? <Check size={16} color="#FFF" /> : <X size={16} color="#FFF" />}
          <Text style={styles.decisionBannerText}>
            {decision === 'autorizado' ? 'Ingreso autorizado correctamente' : 'Ingreso denegado'}
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardEyebrow}>Vehículo</Text>
          <PlateBadge plate={vehiculo.placa} />
          <Text style={styles.vehicleMeta}>
            {vehiculo.marca} {vehiculo.modelo} • {vehiculo.color}
          </Text>
        </View>
        <Car size={30} color={COLORS.primary} />
      </View>

      <TouchableOpacity
        style={[styles.paymentCard, pagado ? styles.paymentCardOk : styles.paymentCardBad]}
        onPress={onTogglePagado}
        activeOpacity={0.85}
      >
        {pagado ? <CheckCircle2 size={26} color={COLORS.success} /> : <XCircle size={26} color={COLORS.danger} />}
        <View>
          <Text style={[styles.paymentTitle, { color: pagado ? COLORS.success : COLORS.danger }]}>
            {pagado ? 'Parqueadero Pagado' : 'Parqueadero No Pagado'}
          </Text>
          <Text style={styles.paymentSubtitle}>
            Toca para {pagado ? 'marcar como pendiente' : 'confirmar pago'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardEyebrow}>Propietario Principal</Text>
        <View style={styles.ownerRow}>
          <View style={styles.ownerAvatar}>
            <GraduationCap size={22} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.ownerName}>{vehiculo.propietario.nombre}</Text>
            <Text style={styles.ownerRole}>{vehiculo.propietario.rol}</Text>
          </View>
        </View>
        <View style={styles.ownerDivider} />
        <View style={styles.ownerDetailRow}>
          <Building2 size={14} color={COLORS.textMuted} />
          <Text style={styles.ownerDetailText}>{vehiculo.propietario.facultad}</Text>
        </View>
        <View style={styles.ownerDetailRow}>
          <CreditCard size={14} color={COLORS.textMuted} />
          <Text style={styles.ownerDetailText}>C.I. {vehiculo.propietario.cedula}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.familyCard]}>
        <View style={styles.familyHeaderRow}>
          <View style={styles.familyHeaderLeft}>
            <Users size={14} color={COLORS.textMuted} />
            <Text style={styles.cardEyebrow}>Familiares Autorizados</Text>
          </View>
          <View style={styles.familyCountBadge}>
            <Text style={styles.familyCountText}>
              {familiares.filter((f) => f.autorizado).length}/{familiares.length}
            </Text>
          </View>
        </View>

        {familiares.map((f) => (
          <View key={f.id} style={styles.familyRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.familyName}>{f.nombre}</Text>
              <Text style={styles.familyMeta}>
                {f.relacion} • C.I. {f.cedula}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.familyToggle, f.autorizado ? styles.familyToggleOn : styles.familyToggleOff]}
              onPress={() => onToggleFamiliar(f.id)}
              activeOpacity={0.8}
            >
              {f.autorizado ? <Check size={12} color="#FFF" /> : <X size={12} color={COLORS.textMuted} />}
              <Text style={[styles.familyToggleText, !f.autorizado && { color: COLORS.textMuted }]}>
                {f.autorizado ? 'Autorizado' : 'No autorizado'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.decisionRow}>
        <TouchableOpacity style={styles.denyButton} onPress={() => onDecision('denegado')} activeOpacity={0.85}>
          <XCircle size={16} color={COLORS.danger} />
          <Text style={styles.denyButtonText}>Denegar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authorizeButton} onPress={() => onDecision('autorizado')} activeOpacity={0.85}>
          <CheckCircle2 size={16} color="#FFFFFF" />
          <Text style={styles.authorizeButtonText}>Autorizar Ingreso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HistorySection({ historyData, filter, setFilter }) {
  const filtered = historyData.filter((h) => filter === 'todos' || h.tipo === filter);
  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'entrada', label: 'Entradas' },
    { key: 'salida', label: 'Salidas' },
  ];

  return (
    <View style={styles.sectionGap}>
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterChipText, filter === f.key && styles.filterChipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionGap}>
        {filtered.map((h) => (
          <View key={h.id} style={styles.historyRow}>
            <View style={[styles.historyIcon, h.tipo === 'entrada' ? styles.historyIconIn : styles.historyIconOut]}>
              {h.tipo === 'entrada' ? (
                <LogIn size={16} color={COLORS.success} />
              ) : (
                <LogOut size={16} color={COLORS.danger} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <PlateBadge plate={h.placa} small />
              <Text style={styles.historyName}>{h.nombre}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.historyTime}>{h.hora}</Text>
              <Text style={styles.historyDate}>{h.fecha}</Text>
            </View>
          </View>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.emptyText}>No hay movimientos para este filtro.</Text>
        )}
      </View>
    </View>
  );
}

/* ---------- Main App ---------- */

export default function ParkingControlApp() {
  const [activeTab, setActiveTab] = useState('control');
  const [tipoMovimiento, setTipoMovimiento] = useState('entrada');
  const [fotoFrontal, setFotoFrontal] = useState(false);
  const [fotoLateral, setFotoLateral] = useState(false);
  const [placaInput, setPlacaInput] = useState('');
  const [pagado, setPagado] = useState(true);
  const [decision, setDecision] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('todos');

  const [familiares, setFamiliares] = useState([
    { id: 1, nombre: 'Elena Torres Vega', relacion: 'Esposa', cedula: '1776543210', autorizado: true },
    { id: 2, nombre: 'María Salazar Torres', relacion: 'Hija', cedula: '1798765432', autorizado: true },
    { id: 3, nombre: 'Jorge Salazar Torres', relacion: 'Hijo', cedula: '1787654321', autorizado: false },
  ]);

  const vehiculo = {
    placa: 'PBX-1234',
    marca: 'Chevrolet',
    modelo: 'Aveo 2019',
    color: 'Gris Plata',
    propietario: {
      nombre: 'Dr. Fernando Salazar Peña',
      rol: 'Docente Titular',
      facultad: 'Facultad de Ingeniería y Ciencias Aplicadas',
      cedula: '1712345678',
    },
  };

  const historyData = [
    { id: 1, tipo: 'entrada', placa: 'PBX-1234', nombre: 'Fernando Salazar', hora: '07:42', fecha: 'Hoy' },
    { id: 2, tipo: 'salida', placa: 'GBA-0321', nombre: 'Lucía Herrera', hora: '07:35', fecha: 'Hoy' },
    { id: 3, tipo: 'entrada', placa: 'PCD-7789', nombre: 'Manuel Ríos', hora: '07:20', fecha: 'Hoy' },
    { id: 4, tipo: 'entrada', placa: 'ABC-1122', nombre: 'Cristina Vela', hora: '07:05', fecha: 'Hoy' },
    { id: 5, tipo: 'salida', placa: 'PBX-1234', nombre: 'Fernando Salazar', hora: '18:10', fecha: 'Ayer' },
    { id: 6, tipo: 'entrada', placa: 'JJT-4456', nombre: 'Andrés Pico', hora: '08:02', fecha: 'Ayer' },
    { id: 7, tipo: 'salida', placa: 'ABC-1122', nombre: 'Cristina Vela', hora: '17:45', fecha: 'Ayer' },
  ];

  const titles = {
    control: ['Control de Acceso', 'Registro de entradas y salidas'],
    verificacion: ['Verificación de Vehículo', 'Resultado de la búsqueda'],
    historial: ['Historial de Movimientos', 'Últimos ingresos y salidas'],
  };

  const handleScan = () => {
    setDecision(null);
    setActiveTab('verificacion');
  };

  const toggleFamiliar = (id) => {
    setFamiliares((prev) => prev.map((f) => (f.id === id ? { ...f, autorizado: !f.autorizado } : f)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={titles[activeTab][0]} subtitle={titles[activeTab][1]} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'control' && (
          <ControlSection
            tipoMovimiento={tipoMovimiento}
            setTipoMovimiento={setTipoMovimiento}
            fotoFrontal={fotoFrontal}
            fotoLateral={fotoLateral}
            onToggleFrontal={() => setFotoFrontal((v) => !v)}
            onToggleLateral={() => setFotoLateral((v) => !v)}
            placaInput={placaInput}
            setPlacaInput={setPlacaInput}
            onScan={handleScan}
          />
        )}

        {activeTab === 'verificacion' && (
          <VerificationSection
            vehiculo={vehiculo}
            pagado={pagado}
            onTogglePagado={() => setPagado((v) => !v)}
            familiares={familiares}
            onToggleFamiliar={toggleFamiliar}
            decision={decision}
            onDecision={setDecision}
          />
        )}

        {activeTab === 'historial' && (
          <HistorySection historyData={historyData} filter={historyFilter} setFilter={setHistoryFilter} />
        )}
      </ScrollView>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },
  sectionGap: { gap: 14 },

  /* Header */
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.accent,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo: {
    width: 40,
    height: 40,
  },
  uceLogo: {
    width: 44,
    height: 44,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#93C5FD',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  headerSubtitle: { fontSize: 12, color: '#BFDBFE', marginTop: 4 },
  guardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  guardPillText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF' },
  guardDot: { color: '#93C5FD', fontSize: 12 },

  /* Plate badge */
  plateWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.textDark,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  plateWrapSm: {},
  plateFlag: { backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 6, justifyContent: 'center' },
  plateFlagSm: { paddingHorizontal: 6, paddingVertical: 4 },
  plateFlagText: { fontSize: 10, fontWeight: '800', color: COLORS.accent },
  plateBody: { paddingHorizontal: 12, paddingVertical: 6, justifyContent: 'center' },
  plateBodySm: { paddingHorizontal: 8, paddingVertical: 4 },
  plateText: { fontFamily: MONO_FONT, fontSize: 17, fontWeight: '800', color: COLORS.textDark, letterSpacing: 1.5 },
  plateTextSm: { fontSize: 13 },

  /* Camera slots */
  label: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  camRow: { flexDirection: 'row', gap: 12 },
  camSlot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.camBorder,
    backgroundColor: COLORS.camBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  camSlotCaptured: { borderColor: COLORS.success },
  camCorner: { position: 'absolute', width: 16, height: 16, borderColor: COLORS.accent },
  camCornerTL: { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2 },
  camCornerTR: { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2 },
  camCornerBL: { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2 },
  camCornerBR: { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2 },
  camThumb: { ...StyleSheet.absoluteFillObject },
  camCheckBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.success,
    borderRadius: 10,
    padding: 2,
  },
  camLabel: { fontSize: 11, fontWeight: '700', color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: 0.5 },
  camStatus: { fontSize: 10, color: '#86EFAC' },

  /* Plate input + scan button */
  plateInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    textAlign: 'center',
    fontFamily: MONO_FONT,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.textDark,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  scanButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },

  noticeBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 10,
    padding: 12,
  },
  noticeText: { flex: 1, fontSize: 11, color: '#92400E' },

  /* Verification cards */
  decisionBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, padding: 12 },
  decisionBannerText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  bgSuccess: { backgroundColor: COLORS.success },
  bgDanger: { backgroundColor: COLORS.danger },

  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  cardEyebrow: { fontSize: 11, fontWeight: '700', color: COLORS.textFaint, textTransform: 'uppercase', letterSpacing: 0.5 },

  vehicleMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 6 },

  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
  },
  paymentCardOk: { backgroundColor: COLORS.successBg, borderColor: COLORS.success },
  paymentCardBad: { backgroundColor: COLORS.dangerBg, borderColor: COLORS.danger },
  paymentTitle: { fontSize: 14, fontWeight: '800' },
  paymentSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },

  ownerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerName: { fontSize: 14, fontWeight: '800', color: COLORS.textDark },
  ownerRole: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginTop: 1 },
  ownerDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  ownerDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ownerDetailText: { fontSize: 11, color: COLORS.textMuted, flexShrink: 1 },

  /* Familiares — sección destacada */
  familyCard: { borderColor: COLORS.accent, borderWidth: 2, backgroundColor: '#FFFBEB' },
  familyHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  familyHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  familyCountBadge: { backgroundColor: '#FDE68A', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  familyCountText: { fontSize: 11, fontWeight: '800', color: '#92400E' },
  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 10,
    gap: 8,
  },
  familyName: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  familyMeta: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  familyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  familyToggleOn: { backgroundColor: COLORS.success },
  familyToggleOff: { backgroundColor: '#E2E8F0' },
  familyToggleText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF' },

  decisionRow: { flexDirection: 'row', gap: 12 },
  denyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: COLORS.danger,
    borderRadius: 14,
    paddingVertical: 13,
  },
  denyButtonText: { color: COLORS.danger, fontWeight: '800', fontSize: 13 },
  authorizeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.success,
    borderRadius: 14,
    paddingVertical: 13,
  },
  authorizeButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },

  /* History */
  filterRow: { flexDirection: 'row', gap: 8 },
  filterChip: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 10, backgroundColor: '#E2E8F0' },
  filterChipActive: { backgroundColor: COLORS.primary },
  filterChipText: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, textTransform: 'uppercase' },
  filterChipTextActive: { color: '#FFFFFF' },

  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
  },
  historyIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  historyIconIn: { backgroundColor: '#DCFCE7' },
  historyIconOut: { backgroundColor: '#FEE2E2' },
  historyName: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  historyTime: { fontSize: 12, fontWeight: '800', color: COLORS.textDark },
  historyDate: { fontSize: 11, color: COLORS.textFaint },
  emptyText: { textAlign: 'center', fontSize: 12, color: COLORS.textFaint, paddingVertical: 24 },

  /* Bottom nav */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  navItemActive: { borderTopColor: COLORS.accent },
  navLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textFaint },
  navLabelActive: { color: COLORS.primary },
});

