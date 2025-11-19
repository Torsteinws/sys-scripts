/**
 * Generated TypeScript definitions for KWin
 * Auto-generated from Doxygen documentation
 * Generated on: 2025-11-14T19:34:17.088Z
 * Classes parsed: 11
 */

// Signal type helper for KWin signals
interface Signal<T extends (...args: any[]) => void> {
  connect(callback: T): void;
  disconnect(callback: T): void;
}

// Qt Types - only types actually used in KWin interfaces
declare type QIcon = any;
declare type QPalette = any;
declare type QPoint = any;
declare type QPointF = any;
declare type QRect = any;
declare type QRectF = any;
declare type QRegion = any;
declare type QSize = any;
declare type QSizeF = any;
declare type QUuid = any;
declare type QVariant = any;
declare type QScriptValue = (...args: any[]) => void;

// Qt namespace types
declare namespace Qt {
  type Edge = any;
  const UserRole = 0x0100;
}

// std namespace types - only types actually used in KWin interfaces
declare namespace std {
  namespace chrono {
    type milliseconds = any;
  }
}
/** KWin namespace */
declare namespace KWin {
  // Global enums
  enum DeviceType {
    Desktop,
    Laptop,
    Phone,
    Touchpad,
    Touchscreen
  }

  enum ColorspaceType {
    LinearRGB = 0,
    NonLinearRGB,
    ICtCp,
    AnyNonRGB
  }

  enum RenderingIntent {
    Perceptual,
    RelativeColorimetric,
    AbsoluteColorimetricNoAdaptation,
    RelativeColorimetricWithBPC
  }

  enum YUVMatrixCoefficients {
    Identity,
    BT601,
    BT709,
    BT2020
  }

  enum EncodingRange {
    Limited,
    Full
  }

  enum PointerButtonState {
    Released,
    Pressed
  }

  enum PointerAxis {
    Vertical,
    Horizontal
  }

  enum PointerAxisSource {
    Unknown,
    Wheel,
    Finger,
    Continuous,
    WheelTilt
  }

  enum KeyboardKeyState {
    Released,
    Pressed,
    Repeated
  }

  enum SwitchState {
    Off,
    On
  }

  enum OutputLayerType {
    /** Required for driving an output */
    Primary,
    /** Can only be used for cursor, or cursor-attached items, as the layer may be moved asynchronously by a different process (like the host compositor in a nested session) */
    CursorOnly,
    /** Should be preferred to normal overlays when possible, as they&#x27;re often more efficient (but often come with size restrictions) */
    EfficientOverlay,
    /** Generic over- or underlay */
    GenericLayer
  }

  enum EffectFrameStyle {
    /** Displays no frame around the contents. */
    EffectFrameNone,
    /** Displays a basic box around the contents. */
    EffectFrameUnstyled,
    /** Displays a Plasma-styled frame around the contents. */
    EffectFrameStyled
  }

  enum DataRole {
    WindowAddedGrabRole = 1,
    WindowClosedGrabRole,
    WindowMinimizedGrabRole,
    WindowUnminimizedGrabRole,
    /** For fullscreen effects to enforce blurring of windows,. */
    WindowForceBlurRole,
    /** For fullscreen effects to enforce the background contrast,. */
    WindowForceBackgroundContrastRole
  }

  enum LoadEffectFlag {
    /** Effect should be loaded. */
    Load = 1 << 0,
    /** The Check Default Function needs to be invoked if the Effect provides it. */
    CheckDefaultFunction = 1 << 2
  }

  enum CompositingType {
    NoCompositing = 0,
    /** Used as a flag whether OpenGL based compositing is used. The flag is or-ed to the enum values of the specific OpenGL types. The actual Compositors use the or OpenGLCompositing flags. If you need to know whether OpenGL is used, either and the flag or use EffectsHandler::isOpenGLCompositing(). */
    OpenGLCompositing = 1,
    QPainterCompositing = 1 << 2
  }

  enum clientAreaOption {
    PlacementArea,
    MovementArea,
    MaximizeArea,
    MaximizeFullArea,
    FullScreenArea,
    WorkArea,
    FullArea,
    ScreenArea
  }

  enum MaximizeMode {
    /** The window is not maximized in any direction. */
    MaximizeRestore = 0,
    /** The window is maximized vertically. */
    MaximizeVertical = 1,
    /** The window is maximized horizontally. */
    MaximizeHorizontal = 2,
    /** Equal to MaximizeVertical | MaximizeHorizontal. */
    MaximizeFull = MaximizeVertical | MaximizeHorizontal
  }

  enum ElectricBorder {
    ElectricTop,
    ElectricTopRight,
    ElectricRight,
    ElectricBottomRight,
    ElectricBottom,
    ElectricBottomLeft,
    ElectricLeft,
    ElectricTopLeft,
    ELECTRIC_COUNT,
    ElectricNone
  }

  enum ElectricBorderAction {
    ElectricActionNone,
    ElectricActionShowDesktop,
    ElectricActionLockScreen,
    ElectricActionKRunner,
    ElectricActionActivityManager,
    ElectricActionApplicationLauncher,
    ELECTRIC_ACTION_COUNT
  }

  enum TabBoxMode {
    TabBoxWindowsMode,
    TabBoxWindowsAlternativeMode,
    TabBoxCurrentAppWindowsMode,
    TabBoxCurrentAppWindowsAlternativeMode
  }

  enum KWinOption {
    CloseButtonCorner,
    SwitchDesktopOnScreenEdge,
    SwitchDesktopOnScreenEdgeMovingWindows
  }

  enum PointerAxisDirection {
    PointerAxisUp,
    PointerAxisDown,
    PointerAxisLeft,
    PointerAxisRight
  }

  enum SwipeDirection {
    Invalid,
    Down,
    Left,
    Up,
    Right
  }

  enum PinchDirection {
    Expanding,
    Contracting
  }

  enum SessionState {
    Normal,
    Saving,
    Quitting
  }

  enum LED {
    NumLock = 1 << 0,
    CapsLock = 1 << 1,
    ScrollLock = 1 << 2,
    Compose = 1 << 3,
    Kana = 1 << 4
  }

  enum Layer {
    UnknownLayer = -1,
    FirstLayer = 0,
    DesktopLayer = 0,
    BelowLayer,
    NormalLayer,
    AboveLayer,
    NotificationLayer,
    ActiveLayer,
    PopupLayer,
    CriticalNotificationLayer,
    OnScreenDisplayLayer,
    OverlayLayer,
    NumLayers
  }

  enum QuickTileFlag {
    None = 0,
    Left = 1 << 0,
    Right = 1 << 1,
    Top = 1 << 2,
    Bottom = 1 << 3,
    Custom = 1 << 4,
    Horizontal = Left | Right,
    Vertical = Top | Bottom
  }

  enum PresentationMode {
    VSync,
    AdaptiveSync,
    Async,
    AdaptiveAsync
  }

  enum ContentType {
    None = 0,
    Photo = 1,
    Video = 2,
    Game = 3
  }

  enum VrrPolicy {
    Never = 0,
    Always = 1,
    Automatic = 2
  }

  enum PresentationModeHint {
    VSync,
    Async
  }

  enum WindowType {
    /** intermediate value, do not use */
    Undefined = -2,
    /** indicates that the window did not define a window type. */
    Unknown = -1,
    /** indicates that this is a normal, top-level window */
    Normal = 0,
    /** indicates a desktop feature. This can include a single window containing desktop icons with the same dimensions as the screen, allowing the desktop environment to have full control of the desktop, without the need for proxying root window clicks. */
    Desktop = 1,
    /** indicates a dock or panel feature */
    Dock = 2,
    /** indicates a toolbar window */
    Toolbar = 3,
    /** indicates a pinnable (torn-off) menu window */
    Menu = 4,
    /** indicates that this is a dialog window */
    Dialog = 5,
    /** Deprecated:has unclear meaning and is KDE-only */
    Override = 6,
    /** indicates a toplevel menu (AKA macmenu). This is a KDE extension to the _NET_WM_WINDOW_TYPE mechanism. */
    TopMenu = 7,
    /** indicates a utility window */
    Utility = 8,
    /** indicates that this window is a splash screen window. */
    Splash = 9,
    /** indicates a dropdown menu (from a menubar typically) */
    DropdownMenu = 10,
    /** indicates a popup menu (a context menu typically) */
    PopupMenu = 11,
    /** indicates a tooltip window */
    Tooltip = 12,
    /** indicates a notification window */
    Notification = 13,
    /** indicates that the window is a list for a combobox */
    ComboBox = 14,
    /** indicates a window that represents the dragged object during DND operation */
    DNDIcon = 15,
    /** indicates an On Screen Display window (such as volume feedback) */
    OnScreenDisplay = 16,
    /** indicates a critical notification (such as battery is running out) */
    CriticalNotification = 17,
    /** indicates that this window is an applet. */
    AppletPopup = 18
  }

  enum WindowTypeMask {
    /** See alsoNormal */
    NormalMask = 1 << 0,
    /** See alsoDesktop */
    DesktopMask = 1 << 1,
    /** See alsoDock */
    DockMask = 1 << 2,
    /** See alsoToolbar */
    ToolbarMask = 1 << 3,
    /** See alsoMenu */
    MenuMask = 1 << 4,
    /** See alsoDialog */
    DialogMask = 1 << 5,
    /** See alsoOverride */
    OverrideMask = 1 << 6,
    /** See alsoTopMenu */
    TopMenuMask = 1 << 7,
    /** See alsoUtility */
    UtilityMask = 1 << 8,
    /** See alsoSplash */
    SplashMask = 1 << 9,
    /** See alsoDropdownMenu */
    DropdownMenuMask = 1 << 10,
    /** See alsoPopupMenu */
    PopupMenuMask = 1 << 11,
    /** See alsoTooltip */
    TooltipMask = 1 << 12,
    /** See alsoNotification */
    NotificationMask = 1 << 13,
    /** See alsoComboBox */
    ComboBoxMask = 1 << 14,
    /** See alsoDNDIcon */
    DNDIconMask = 1 << 15,
    /** NON STANDARD. */
    OnScreenDisplayMask = 1 << 16,
    /** NON STANDARD. */
    CriticalNotificationMask = 1 << 17,
    /** NON STANDARD. */
    AppletPopupMask = 1 << 18,
    /** All window types. */
    AllTypesMask = 0xFFFFFFFF
  }

  enum OutputConfigurationError {
    None,
    Unknown,
    TooManyEnabledOutputs
  }

  enum Driver {
    Driver_R100,
    Driver_R200,
    Driver_R300C,
    Driver_R300G,
    Driver_R600C,
    Driver_R600G,
    Driver_Nouveau,
    Driver_Intel,
    Driver_NVidia,
    Driver_Catalyst,
    Driver_Swrast,
    Driver_Softpipe,
    Driver_Llvmpipe,
    Driver_VirtualBox,
    Driver_VMware,
    Driver_Qualcomm,
    Driver_RadeonSI,
    Driver_Virgl,
    Driver_Panfrost,
    Driver_Lima,
    Driver_VC4,
    Driver_V3D,
    Driver_Unknown
  }

  enum ChipClass {
    R100 = 0,
    R200,
    R300,
    R400,
    R500,
    R600,
    R700,
    Evergreen,
    NorthernIslands,
    SouthernIslands,
    SeaIslands,
    VolcanicIslands,
    ArcticIslands,
    Vega,
    Navi,
    UnknownRadeon = 999,
    NV10 = 1000,
    NV20,
    NV30,
    NV40,
    G80,
    GF100,
    UnknownNVidia = 1999,
    I8XX = 2000,
    I915,
    I965,
    SandyBridge,
    IvyBridge,
    Haswell,
    BayTrail,
    Cherryview,
    Broadwell,
    ApolloLake,
    Skylake,
    GeminiLake,
    KabyLake,
    CoffeeLake,
    WhiskeyLake,
    CometLake,
    CannonLake,
    IceLake,
    TigerLake,
    UnknownIntel = 2999,
    Adreno1XX = 3000,
    Adreno2XX,
    Adreno3XX,
    Adreno4XX,
    Adreno5XX,
    UnknownAdreno = 3999,
    MaliT7XX = 4000,
    MaliT8XX,
    MaliGXX,
    UnknownPanfrost = 4999,
    Mali400 = 5000,
    Mali450,
    Mali470,
    UnknownLima = 5999,
    VC4_2_1 = 6000,
    UnknownVideoCore4 = 6999,
    V3D_4_2 = 7000,
    UnknownVideoCore3D = 7999,
    UnknownChipClass = 99999
  }

  enum ShaderTrait {
    MapTexture = (1 << 0),
    UniformColor = (1 << 1),
    Modulate = (1 << 2),
    AdjustSaturation = (1 << 3),
    TransformColorspace = (1 << 4),
    MapExternalTexture = (1 << 5),
    MapYUVTexture = (1 << 6),
    RoundedCorners = (1 << 7),
    Border = (1 << 8)
  }

  enum TextureCoordinateType {
    NormalizedCoordinates = 0,
    UnnormalizedCoordinates
  }

  enum VertexAttributeType {
    VA_Position = 0,
    VA_TexCoord = 1,
    VertexAttributeCount = 2
  }

  enum XwaylandEavesdropsMode {
    None,
    NonCharacterKeys,
    AllKeysWithModifier,
    All
  }

  enum XwaylandCrashPolicy {
    Stop,
    Restart
  }

  enum PlacementPolicy {
    PlacementNone,
    PlacementDefault,
    PlacementUnknown,
    PlacementRandom,
    PlacementSmart,
    PlacementCentered,
    PlacementZeroCornered,
    PlacementUnderMouse,
    PlacementOnMainWindow,
    PlacementMaximizing
  }

  enum FocusStealingPreventionLevel {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    Extreme = 4
  }

  enum NightLightMode {
    /** Color temperature is constant throughout the day. */
    Constant,
    /** The color temperature is adjusted based on time of day. */
    DarkLight
  }

  enum ScreenShotFlag {
    /** Include window titlebar and borders. */
    ScreenShotIncludeDecoration = 0x1,
    /** Include the cursor. */
    ScreenShotIncludeCursor = 0x2,
    /** Take the screenshot at the native resolution. */
    ScreenShotNativeResolution = 0x4,
    /** Include the window shadow. */
    ScreenShotIncludeShadow = 0x8
  }

  enum StrutArea {
    StrutAreaInvalid = 0,
    StrutAreaTop = 1 << 0,
    StrutAreaRight = 1 << 1,
    StrutAreaBottom = 1 << 2,
    StrutAreaLeft = 1 << 3,
    StrutAreaAll = StrutAreaTop | StrutAreaRight | StrutAreaBottom | StrutAreaLeft
  }

  enum DnDAction {
    None = 0,
    Copy = 1 << 0,
    Move = 1 << 1,
    Ask = 1 << 2
  }

  enum TextInputContentHint {
    /** no special behaviour */
    None = 0,
    /** suggest word completions */
    AutoCompletion = 1 << 0,
    /** suggest word corrections */
    AutoCorrection = 1 << 1,
    /** switch to uppercase letters at the start of a sentence */
    AutoCapitalization = 1 << 2,
    /** prefer lowercase letters */
    LowerCase = 1 << 3,
    /** prefer uppercase letters */
    UpperCase = 1 << 4,
    /** prefer casing for titles and headings (can be language dependent) */
    TitleCase = 1 << 5,
    /** characters should be hidden */
    HiddenText = 1 << 6,
    /** typed text should not be stored */
    SensitiveData = 1 << 7,
    /** just latin characters should be entered */
    Latin = 1 << 8,
    /** the text input is multi line */
    MultiLine = 1 << 9
  }

  enum TextInputContentPurpose {
    /** default input, allowing all characters */
    Normal,
    /** allow only alphabetic characters */
    Alpha,
    /** allow only digits */
    Digits,
    /** input a number (including decimal separator and sign) */
    Number,
    /** input a phone number */
    Phone,
    /** input an URL */
    Url,
    /** input an email address */
    Email,
    /** input a name of a person */
    Name,
    /** input a password */
    Password,
    /** input a date */
    Date,
    /** input a time */
    Time,
    /** input a date and time */
    DateTime,
    /** input for a terminal */
    Terminal,
    /** input is numeric password */
    Pin
  }

  enum TextInputChangeCause {
    /** Change caused by input method */
    InputMethod,
    /** Something else other than input method caused change */
    Other
  }

  enum WaylandGeometryType {
    WaylandGeometryClient = 0x1,
    WaylandGeometryFrame = 0x2,
    WaylandGeometryBuffer = 0x4
  }

  namespace WorkspaceWrapper {
    enum ClientAreaOption {
      /** geometry where a window will be initially placed after being mapped window movement snapping area? ignore struts */
      PlacementArea,
      /** geometry to which a window will be maximized */
      MovementArea,
      /** like MaximizeArea, but ignore struts - used e.g. for topmenu */
      MaximizeArea,
      /** area for fullscreen windows */
      MaximizeFullArea,
      /** whole workarea (all screens together) */
      FullScreenArea,
      /** whole area (all screens together), ignore struts */
      WorkArea,
      /** one whole screen, ignore struts */
      FullArea,
      ScreenArea
    }

    enum ElectricBorder {
      ElectricTop,
      ElectricTopRight,
      ElectricRight,
      ElectricBottomRight,
      ElectricBottom,
      ElectricBottomLeft,
      ElectricLeft,
      ElectricTopLeft,
      ELECTRIC_COUNT,
      ElectricNone
    }

  }

  namespace Window {
    enum SizeMode {
      SizeModeAny,
      /** Try not to affect width. */
      SizeModeFixedW,
      /** Try not to affect height. */
      SizeModeFixedH,
      /** Try not to make it larger in either direction. */
      SizeModeMax
    }

    enum SameApplicationCheck {
      RelaxedForActive = 1 << 0,
      AllowCrossProcesses = 1 << 1
    }

    enum MoveResizeMode {
      None,
      Move = 0x1,
      Resize = 0x2,
      MoveResize = Move | Resize
    }

  }

  namespace Output {
    enum DpmsMode {
      On,
      Standby,
      Suspend,
      Off,
      AboutToTurnOff
    }

    enum Capability {
      Dpms = 1,
      Overscan = 1 << 1,
      Vrr = 1 << 2,
      RgbRange = 1 << 3,
      HighDynamicRange = 1 << 4,
      WideColorGamut = 1 << 5,
      AutoRotation = 1 << 6,
      IccProfile = 1 << 7,
      Tearing = 1 << 8,
      BrightnessControl = 1 << 9,
      BuiltInColorProfile = 1 << 10,
      DdcCi = 1 << 11,
      MaxBitsPerColor = 1 << 12,
      Edr = 1 << 13,
      SharpnessControl = 1 << 14
    }

    enum SubPixel {
      Unknown,
      None,
      Horizontal_RGB,
      Horizontal_BGR,
      Vertical_RGB,
      Vertical_BGR
    }

    enum RgbRange {
      Automatic = 0,
      Full = 1,
      Limited = 2
    }

    enum AutoRotationPolicy {
      Never = 0,
      InTabletMode,
      Always
    }

    enum ColorProfileSource {
      sRGB = 0,
      ICC,
      EDID
    }

    enum ColorPowerTradeoff {
      PreferEfficiency = 0,
      PreferAccuracy
    }

    enum EdrPolicy {
      Never = 0,
      Always
    }

  }

  namespace Tile {
    enum LayoutDirection {
      Floating = 0,
      Horizontal = 1,
      Vertical = 2
    }

  }

  namespace TileModel {
    enum Roles {
      TileRole = Qt.UserRole + 1
    }

  }

  namespace CustomTile {
    enum LayoutDirection {
      Floating = 0,
      Horizontal = 1,
      Vertical = 2
    }

  }

  namespace Options {
    enum FocusPolicy {
      /** Clicking into a window activates it. This is also the default. */
      ClickToFocus,
      /** Moving the mouse pointer actively onto a normal window activates it. For convenience, the desktop and windows on the dock are excluded. They require clicking. */
      FocusFollowsMouse,
      /** The window that happens to be under the mouse pointer becomes active. The invariant is: no window can have focus that is not under the mouse. This also means that Alt-Tab won&#x27;t work properly and popup dialogs are usually unusable with the keyboard. Note that the desktop and windows on the dock are excluded for convenience. They get focus only when clicking on it. */
      FocusUnderMouse,
      /** This is even worse than FocusUnderMouse. Only the window under the mouse pointer is active. If the mouse points nowhere, nothing has the focus. If the mouse points onto the desktop, the desktop has focus. The same holds for windows on the dock. */
      FocusStrictlyUnderMouse
    }

    enum ActivationDesktopPolicy {
      SwitchToOtherDesktop,
      BringToCurrentDesktop,
      DoNothing
    }

    enum WindowOperation {
      MaximizeOp = 5000,
      RestoreOp,
      MinimizeOp,
      MoveOp,
      UnrestrictedMoveOp,
      ResizeOp,
      UnrestrictedResizeOp,
      CloseOp,
      OnAllDesktopsOp,
      KeepAboveOp,
      KeepBelowOp,
      WindowRulesOp,
      /** @obsolete */
      ToggleStoreSettingsOp = 5011,
      HMaximizeOp,
      VMaximizeOp,
      LowerOp,
      FullScreenOp,
      NoBorderOp,
      NoOp,
      SetupWindowShortcutOp,
      ApplicationRulesOp
    }

    enum MouseCommand {
      MouseRaise,
      MouseLower,
      MouseOperationsMenu,
      MouseToggleRaiseAndLower,
      MouseActivateAndRaise,
      MouseActivateAndLower,
      MouseActivate,
      MouseActivateRaiseAndPassClick,
      MouseActivateAndPassClick,
      MouseMove,
      MouseUnrestrictedMove,
      MouseActivateRaiseAndMove,
      MouseActivateRaiseAndUnrestrictedMove,
      MouseResize,
      MouseUnrestrictedResize,
      MouseMaximize,
      MouseRestore,
      MouseMinimize,
      MouseNextDesktop,
      MousePreviousDesktop,
      MouseAbove,
      MouseBelow,
      MouseOpacityMore,
      MouseOpacityLess,
      MouseClose,
      MouseNothing,
      MouseActivateRaiseOnReleaseAndPassClick
    }

    enum MouseWheelCommand {
      MouseWheelRaiseLower,
      MouseWheelMaximizeRestore,
      MouseWheelAboveBelow,
      MouseWheelPreviousNextDesktop,
      MouseWheelChangeOpacity,
      MouseWheelNothing
    }

  }


  class WorkspaceWrapper {
    /** Properties */
    desktops: KWin.VirtualDesktop[];

    currentDesktop: KWin.VirtualDesktop;

    activeWindow: KWin.Window;

    desktopGridSize: QSize;

    desktopGridWidth: number;

    desktopGridHeight: number;

    workspaceWidth: number;

    workspaceHeight: number;

    workspaceSize: QSize;

    activeScreen: KWin.Output;

    screens: KWin.Output[];

    screenOrder: KWin.Output[];

    currentActivity: string;

    activities: string[];

    virtualScreenSize: QSize;

    virtualScreenGeometry: QRect;

    stackingOrder: KWin.Window[];

    cursorPos: QPoint;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    screenAt(pos: QPointF): KWin.Output;
    /** @Q_INVOKABLE  */ 
    tilingForScreen(screenName: string): KWin.TileManager;
    /** @Q_INVOKABLE  */ 
    tilingForScreen(output: KWin.Output): KWin.TileManager;
    /** @Q_INVOKABLE  */ 
    rootTile(output: KWin.Output, desktop: KWin.VirtualDesktop): KWin.Tile;
    /** @Q_SCRIPTABLE  */ 
    clientArea(option: ClientAreaOption, output: KWin.Output, desktop: KWin.VirtualDesktop): QRectF;
    /** @Q_SCRIPTABLE  */ 
    clientArea(option: ClientAreaOption, client: KWin.Window): QRectF;
    /** @Q_SCRIPTABLE  */ 
    clientArea(option: ClientAreaOption, client: KWin.Window): QRectF;
    /** @Q_SCRIPTABLE  */ 
    createDesktop(position: number, name: string): void;
    /** @Q_SCRIPTABLE  */ 
    removeDesktop(desktop: KWin.VirtualDesktop): void;
    /** @Q_SCRIPTABLE  */ 
    moveDesktop(desktop: KWin.VirtualDesktop, position: number): void;
    /** @Q_SCRIPTABLE  */ 
    supportInformation(): string;
    /** @Q_INVOKABLE  */ 
    raiseWindow(window: KWin.Window): void;
    /** @Q_INVOKABLE  */ 
    windowAt(pos: QPointF, count?: number): KWin.Window[];
    /** @Q_INVOKABLE  */ 
    isEffectActive(pluginId: string): boolean;
    /** @Q_INVOKABLE  */ 
    constrain(below: KWin.Window, above: KWin.Window): void;
    /** @Q_INVOKABLE  */ 
    unconstrain(below: KWin.Window, above: KWin.Window): void;

    /** Signals */
    windowAdded: Signal<(window: KWin.Window) => void>;
    windowRemoved: Signal<(window: KWin.Window) => void>;
    windowActivated: Signal<(window: KWin.Window) => void>;
    desktopsChanged: Signal<() => void>;
    desktopLayoutChanged: Signal<() => void>;
    screensChanged: Signal<() => void>;
    screenOrderChanged: Signal<() => void>;
    currentActivityChanged: Signal<(id: string) => void>;
    activitiesChanged: Signal<(id: string) => void>;
    activityAdded: Signal<(id: string) => void>;
    activityRemoved: Signal<(id: string) => void>;
    virtualScreenSizeChanged: Signal<() => void>;
    virtualScreenGeometryChanged: Signal<() => void>;
    currentDesktopChanged: Signal<(previous: KWin.VirtualDesktop) => void>;
    cursorPosChanged: Signal<() => void>;
  }


  class VirtualDesktop {
    /** Properties */
    id: string;

    x11DesktopNumber: number;

    name: string;


    constructor();

    /** Signals */
    nameChanged: Signal<() => void>;
    x11DesktopNumberChanged: Signal<() => void>;
    aboutToBeDestroyed: Signal<() => void>;
  }


  class Window {
    /** Properties */
    bufferGeometry: QRectF;

    clientGeometry: QRectF;

    pos: QPointF;

    size: QSizeF;

    x: number;

    y: number;

    width: number;

    height: number;

    opacity: number;

    output: KWin.Output;

    rect: QRectF;

    resourceName: string;

    resourceClass: string;

    windowRole: string;

    desktopWindow: boolean;

    dock: boolean;

    toolbar: boolean;

    menu: boolean;

    normalWindow: boolean;

    dialog: boolean;

    splash: boolean;

    utility: boolean;

    dropdownMenu: boolean;

    popupMenu: boolean;

    tooltip: boolean;

    notification: boolean;

    criticalNotification: boolean;

    appletPopup: boolean;

    onScreenDisplay: boolean;

    comboBox: boolean;

    dndIcon: boolean;

    windowType: WindowType;

    managed: boolean;

    deleted: boolean;

    skipsCloseAnimation: boolean;

    popupWindow: boolean;

    outline: boolean;

    internalId: QUuid;

    pid: number;

    stackingOrder: number;

    fullScreen: boolean;

    fullScreenable: boolean;

    active: boolean;

    desktops: KWin.VirtualDesktop[];

    onAllDesktops: boolean;

    activities: string[];

    skipTaskbar: boolean;

    skipPager: boolean;

    skipSwitcher: boolean;

    closeable: boolean;

    icon: QIcon;

    keepAbove: boolean;

    keepBelow: boolean;

    minimizable: boolean;

    minimized: boolean;

    iconGeometry: QRectF;

    specialWindow: boolean;

    demandsAttention: boolean;

    caption: string;

    captionNormal: string;

    minSize: QSizeF;

    maxSize: QSizeF;

    wantsInput: boolean;

    transient: boolean;

    transientFor: KWin.Window;

    modal: boolean;

    frameGeometry: QRectF;

    move: boolean;

    resize: boolean;

    decorationHasAlpha: boolean;

    noBorder: boolean;

    providesContextHelp: boolean;

    maximizable: boolean;

    maximizeMode: KWin.MaximizeMode;

    moveable: boolean;

    moveableAcrossScreens: boolean;

    resizeable: boolean;

    desktopFileName: string;

    hasApplicationMenu: boolean;

    applicationMenuActive: boolean;

    unresponsive: boolean;

    colorScheme: string;

    layer: KWin.Layer;

    hidden: boolean;

    tile: KWin.Tile;

    inputMethod: boolean;

    tag: string;

    description: string;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    setMaximize(vertically: boolean, horizontally: boolean, restore?: QRectF): void;

    /** Signals */
    stackingOrderChanged: Signal<() => void>;
    opacityChanged: Signal<(window: KWin.Window, oldOpacity: number) => void>;
    damaged: Signal<(window: KWin.Window) => void>;
    inputTransformationChanged: Signal<() => void>;
    closed: Signal<() => void>;
    outputChanged: Signal<() => void>;
    skipCloseAnimationChanged: Signal<() => void>;
    windowRoleChanged: Signal<() => void>;
    windowClassChanged: Signal<() => void>;
    surfaceChanged: Signal<() => void>;
    shadowChanged: Signal<() => void>;
    bufferGeometryChanged: Signal<(oldGeometry: QRectF) => void>;
    frameGeometryChanged: Signal<(oldGeometry: QRectF) => void>;
    clientGeometryChanged: Signal<(oldGeometry: QRectF) => void>;
    frameGeometryAboutToChange: Signal<() => void>;
    visibleGeometryChanged: Signal<() => void>;
    tileChanged: Signal<(tile: KWin.Tile) => void>;
    requestedTileChanged: Signal<() => void>;
    fullScreenChanged: Signal<() => void>;
    skipTaskbarChanged: Signal<() => void>;
    skipPagerChanged: Signal<() => void>;
    skipSwitcherChanged: Signal<() => void>;
    iconChanged: Signal<() => void>;
    activeChanged: Signal<() => void>;
    keepAboveChanged: Signal<(param: boolean) => void>;
    keepBelowChanged: Signal<(param: boolean) => void>;
    demandsAttentionChanged: Signal<() => void>;
    desktopsChanged: Signal<() => void>;
    activitiesChanged: Signal<() => void>;
    minimizedChanged: Signal<() => void>;
    paletteChanged: Signal<(p: QPalette) => void>;
    colorSchemeChanged: Signal<() => void>;
    captionChanged: Signal<() => void>;
    captionNormalChanged: Signal<() => void>;
    maximizedAboutToChange: Signal<(mode: MaximizeMode) => void>;
    maximizedChanged: Signal<() => void>;
    transientChanged: Signal<() => void>;
    modalChanged: Signal<() => void>;
    quickTileModeChanged: Signal<() => void>;
    moveResizedChanged: Signal<() => void>;
    moveResizeCursorChanged: Signal<(param: CursorShape) => void>;
    interactiveMoveResizeStarted: Signal<() => void>;
    interactiveMoveResizeStepped: Signal<(geometry: QRectF) => void>;
    interactiveMoveResizeFinished: Signal<() => void>;
    closeableChanged: Signal<(param: boolean) => void>;
    minimizeableChanged: Signal<(param: boolean) => void>;
    maximizeableChanged: Signal<(param: boolean) => void>;
    desktopFileNameChanged: Signal<() => void>;
    applicationMenuChanged: Signal<() => void>;
    hasApplicationMenuChanged: Signal<(param: boolean) => void>;
    applicationMenuActiveChanged: Signal<(param: boolean) => void>;
    unresponsiveChanged: Signal<(param: boolean) => void>;
    decorationChanged: Signal<() => void>;
    hiddenChanged: Signal<() => void>;
    hiddenByShowDesktopChanged: Signal<() => void>;
    lockScreenOverlayChanged: Signal<() => void>;
    readyForPaintingChanged: Signal<() => void>;
    maximizeGeometryRestoreChanged: Signal<() => void>;
    fullscreenGeometryRestoreChanged: Signal<() => void>;
    offscreenRenderingChanged: Signal<() => void>;
    targetScaleChanged: Signal<() => void>;
    nextTargetScaleChanged: Signal<() => void>;
    noBorderChanged: Signal<() => void>;
    tagChanged: Signal<() => void>;
    descriptionChanged: Signal<() => void>;
    borderRadiusChanged: Signal<() => void>;
  }


  class Output {
    /** Properties */
    geometry: QRect;

    devicePixelRatio: number;

    name: string;

    manufacturer: string;

    model: string;

    serialNumber: string;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    mapToGlobal(pos: QPointF): QPointF;
    /** @Q_INVOKABLE  */ 
    mapFromGlobal(pos: QPointF): QPointF;

    /** Signals */
    geometryChanged: Signal<() => void>;
    enabledChanged: Signal<() => void>;
    scaleChanged: Signal<() => void>;
    aboutToTurnOff: Signal<(time: std.chrono.milliseconds) => void>;
    wakeUp: Signal<() => void>;
    aboutToChange: Signal<(changeSet: OutputChangeSet) => void>;
    changed: Signal<() => void>;
    outputLayersChanged: Signal<() => void>;
    currentModeChanged: Signal<() => void>;
    modesChanged: Signal<() => void>;
    transformChanged: Signal<() => void>;
    dpmsModeChanged: Signal<() => void>;
    capabilitiesChanged: Signal<() => void>;
    overscanChanged: Signal<() => void>;
    vrrPolicyChanged: Signal<() => void>;
    rgbRangeChanged: Signal<() => void>;
    wideColorGamutChanged: Signal<() => void>;
    referenceLuminanceChanged: Signal<() => void>;
    highDynamicRangeChanged: Signal<() => void>;
    autoRotationPolicyChanged: Signal<() => void>;
    iccProfileChanged: Signal<() => void>;
    iccProfilePathChanged: Signal<() => void>;
    brightnessMetadataChanged: Signal<() => void>;
    sdrGamutWidenessChanged: Signal<() => void>;
    colorDescriptionChanged: Signal<() => void>;
    blendingColorChanged: Signal<() => void>;
    colorProfileSourceChanged: Signal<() => void>;
    brightnessChanged: Signal<() => void>;
    colorPowerTradeoffChanged: Signal<() => void>;
    dimmingChanged: Signal<() => void>;
    uuidChanged: Signal<() => void>;
    replicationSourceChanged: Signal<() => void>;
    allowDdcCiChanged: Signal<() => void>;
    maxBitsPerColorChanged: Signal<() => void>;
    edrPolicyChanged: Signal<() => void>;
    sharpnessChanged: Signal<() => void>;
  }


  class TileManager {
    /** Properties */
    rootTile: KWin.Tile;

    model: TileModel;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    bestTileForPosition(x: number, y: number): KWin.Tile;

    /** Signals */
    tileRemoved: Signal<(tile: KWin.Tile) => void>;
    rootTileChanged: Signal<(rootTile: CustomTile) => void>;
    modelChanged: Signal<(model: TileModel) => void>;
  }


  class Tile {
    /** Properties */
    relativeGeometry: QRectF;

    absoluteGeometry: QRectF;

    absoluteGeometryInScreen: QRectF;

    padding: number;

    minimumSize: QSizeF;

    positionInLayout: number;

    parent: Tile;

    tiles: KWin.Tile[];

    windows: KWin.Window[];

    isLayout: boolean;

    canBeRemoved: boolean;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    resizeByPixels(delta: number, edge: Qt.Edge): void;
    /** @Q_INVOKABLE  */ 
    manage(window: Window): boolean;
    /** @Q_INVOKABLE  */ 
    unmanage(window: Window): boolean;

    /** Signals */
    activeChanged: Signal<(active: boolean) => void>;
    relativeGeometryChanged: Signal<() => void>;
    absoluteGeometryChanged: Signal<() => void>;
    windowGeometryChanged: Signal<() => void>;
    paddingChanged: Signal<(padding: number) => void>;
    minimumSizeChanged: Signal<(size: QSizeF) => void>;
    rowChanged: Signal<(row: number) => void>;
    isLayoutChanged: Signal<(isLayout: boolean) => void>;
    childTilesChanged: Signal<() => void>;
    windowAdded: Signal<(window: Window) => void>;
    windowRemoved: Signal<(window: Window) => void>;
    windowsChanged: Signal<() => void>;
  }


  class CursorShape {
    constructor();

  }


  class OutputChangeSet {
    constructor();

  }


  class TileModel {
    constructor();

  }


  class CustomTile extends KWin.Tile {
    /** Properties */
    layoutDirection: KWin.Tile.LayoutDirection;

    relativeGeometry: QRectF;

    absoluteGeometry: QRectF;

    absoluteGeometryInScreen: QRectF;

    padding: number;

    minimumSize: QSizeF;

    positionInLayout: number;

    parent: Tile;

    tiles: KWin.Tile[];

    windows: KWin.Window[];

    isLayout: boolean;

    canBeRemoved: boolean;


    constructor();

    /** Qt Decorated Methods */
    /** @Q_INVOKABLE  */ 
    moveByPixels(delta: QPointF): void;
    /** @Q_INVOKABLE  */ 
    remove(): void;
    /** @Q_INVOKABLE  */ 
    split(newDirection: KWin.Tile.LayoutDirection): CustomTile[];
    /** @Q_INVOKABLE  */ 
    resizeByPixels(delta: number, edge: Qt.Edge): void;
    /** @Q_INVOKABLE  */ 
    manage(window: Window): boolean;
    /** @Q_INVOKABLE  */ 
    unmanage(window: Window): boolean;

    /** Signals */
    layoutDirectionChanged: Signal<(direction: Tile.LayoutDirection) => void>;
    layoutModified: Signal<() => void>;
    activeChanged: Signal<(active: boolean) => void>;
    relativeGeometryChanged: Signal<() => void>;
    absoluteGeometryChanged: Signal<() => void>;
    windowGeometryChanged: Signal<() => void>;
    paddingChanged: Signal<(padding: number) => void>;
    minimumSizeChanged: Signal<(size: QSizeF) => void>;
    rowChanged: Signal<(row: number) => void>;
    isLayoutChanged: Signal<(isLayout: boolean) => void>;
    childTilesChanged: Signal<() => void>;
    windowAdded: Signal<(window: Window) => void>;
    windowRemoved: Signal<(window: Window) => void>;
    windowsChanged: Signal<() => void>;
  }


  class Options {
    /** Properties */
    focusPolicy: FocusPolicy;

    xwaylandCrashPolicy: XwaylandCrashPolicy;

    xwaylandMaxCrashCount: number;

    nextFocusPrefersMouse: boolean;

    clickRaise: boolean;

    autoRaise: boolean;

    autoRaiseInterval: number;

    delayFocusInterval: number;

    separateScreenFocus: boolean;

    placement: PlacementPolicy;

    activationDesktopPolicy: ActivationDesktopPolicy;

    focusPolicyIsReasonable: boolean;

    borderSnapZone: number;

    windowSnapZone: number;

    centerSnapZone: number;

    snapOnlyWhenOverlapping: boolean;

    edgeBarrier: number;

    cornerBarrier: number;

    rollOverDesktops: boolean;

    focusStealingPreventionLevel: KWin.FocusStealingPreventionLevel;

    operationTitlebarDblClick: KWin.Options.WindowOperation;

    operationMaxButtonLeftClick: KWin.Options.WindowOperation;

    operationMaxButtonMiddleClick: KWin.Options.WindowOperation;

    operationMaxButtonRightClick: KWin.Options.WindowOperation;

    commandActiveTitlebar1: MouseCommand;

    commandActiveTitlebar2: MouseCommand;

    commandActiveTitlebar3: MouseCommand;

    commandInactiveTitlebar1: MouseCommand;

    commandInactiveTitlebar2: MouseCommand;

    commandInactiveTitlebar3: MouseCommand;

    commandWindow1: MouseCommand;

    commandWindow2: MouseCommand;

    commandWindow3: MouseCommand;

    commandWindowWheel: MouseCommand;

    commandAll1: MouseCommand;

    commandAll2: MouseCommand;

    commandAll3: MouseCommand;

    keyCmdAllModKey: number;

    doubleClickBorderToMaximize: boolean;

    condensedTitle: boolean;

    electricBorderMaximize: boolean;

    electricBorderTiling: boolean;

    electricBorderAllScreenCorner: boolean;

    electricBorderCornerRatio: number;

    borderlessMaximizedWindows: boolean;

    killPingTimeout: number;

    compositingMode: number;

    allowTearing: boolean;

    interactiveWindowMoveEnabled: boolean;

    pictureInPictureHomeCorner: Qt.Corner;

    pictureInPictureMargin: number;

    overlayVirtualKeyboardOnWindows: boolean;


    constructor();

    /** Signals */
    focusPolicyChanged: Signal<() => void>;
    focusPolicyIsResonableChanged: Signal<() => void>;
    xwaylandCrashPolicyChanged: Signal<() => void>;
    xwaylandMaxCrashCountChanged: Signal<() => void>;
    xwaylandEavesdropsChanged: Signal<() => void>;
    xwaylandEavesdropsMouseChanged: Signal<() => void>;
    xwaylandEisNoPromptChanged: Signal<() => void>;
    nextFocusPrefersMouseChanged: Signal<() => void>;
    clickRaiseChanged: Signal<() => void>;
    autoRaiseChanged: Signal<() => void>;
    autoRaiseIntervalChanged: Signal<() => void>;
    delayFocusIntervalChanged: Signal<() => void>;
    separateScreenFocusChanged: Signal<(param: boolean) => void>;
    placementChanged: Signal<() => void>;
    activationDesktopPolicyChanged: Signal<() => void>;
    borderSnapZoneChanged: Signal<() => void>;
    windowSnapZoneChanged: Signal<() => void>;
    centerSnapZoneChanged: Signal<() => void>;
    snapOnlyWhenOverlappingChanged: Signal<() => void>;
    edgeBarrierChanged: Signal<() => void>;
    cornerBarrierChanged: Signal<() => void>;
    rollOverDesktopsChanged: Signal<(enabled: boolean) => void>;
    focusStealingPreventionLevelChanged: Signal<() => void>;
    operationTitlebarDblClickChanged: Signal<() => void>;
    operationMaxButtonLeftClickChanged: Signal<() => void>;
    operationMaxButtonRightClickChanged: Signal<() => void>;
    operationMaxButtonMiddleClickChanged: Signal<() => void>;
    commandActiveTitlebar1Changed: Signal<() => void>;
    commandActiveTitlebar2Changed: Signal<() => void>;
    commandActiveTitlebar3Changed: Signal<() => void>;
    commandInactiveTitlebar1Changed: Signal<() => void>;
    commandInactiveTitlebar2Changed: Signal<() => void>;
    commandInactiveTitlebar3Changed: Signal<() => void>;
    commandWindow1Changed: Signal<() => void>;
    commandWindow2Changed: Signal<() => void>;
    commandWindow3Changed: Signal<() => void>;
    commandWindowWheelChanged: Signal<() => void>;
    commandAll1Changed: Signal<() => void>;
    commandAll2Changed: Signal<() => void>;
    commandAll3Changed: Signal<() => void>;
    keyCmdAllModKeyChanged: Signal<() => void>;
    doubleClickBorderToMaximizeChanged: Signal<() => void>;
    condensedTitleChanged: Signal<() => void>;
    electricBorderMaximizeChanged: Signal<() => void>;
    electricBorderTilingChanged: Signal<() => void>;
    electricBorderCornerRatioChanged: Signal<() => void>;
    electricBorderAllScreenCornerChanged: Signal<() => void>;
    borderlessMaximizedWindowsChanged: Signal<() => void>;
    killPingTimeoutChanged: Signal<() => void>;
    compositingModeChanged: Signal<() => void>;
    animationSpeedChanged: Signal<() => void>;
    configChanged: Signal<() => void>;
    allowTearingChanged: Signal<() => void>;
    interactiveWindowMoveEnabledChanged: Signal<() => void>;
    pictureInPictureHomeCornerChanged: Signal<() => void>;
    pictureInPictureMarginChanged: Signal<() => void>;
    overlayVirtualKeyboardOnWindowsChanged: Signal<() => void>;
  }

}

// Global properties and methods available in KWin scripts.

/**
 * Global property to all configuration values of KWin core.
 */
declare const options: KWin.Options;

/**
 * Global property to the core wrapper of KWin.
 */
declare const workspace: KWin.WorkspaceWrapper;

/**
 * Prints all provided values to kDebug and as a D-Bus signal.
 */
declare function print(...values: QVariant[]): void;

/**
 * Reads the config value for key in the Script's configuration with the optional default value.
 * If not providing a default value and no value stored in the configuration an undefined value is returned.
 */
declare function readConfig(key: string, defaultValue?: QVariant): QVariant;

/**
 * Registers the callback for the screen edge. When the mouse gets pushed against the given edge the callback will be invoked.
 */
declare function registerScreenEdge(
  border: KWin.ElectricBorder,
  callback: QScriptValue
): boolean;

/**
 * Unregisters the callback for the screen edge.
 */
declare function unregisterScreenEdge(border: KWin.ElectricBorder): boolean;

/**
 * Registers keySequence as a global shortcut.
 * When the shortcut is invoked the callback will be called. Title and text are used to name the shortcut and make it available to the global shortcut configuration module.
 */
declare function registerShortcut(
  title: string,
  text: string,
  keySequence: string,
  callback: QScriptValue
): boolean;

/**
 * Aborts the execution of the script if value does not evaluate to true.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assert(value: boolean, message?: string): boolean;

/**
 * Aborts the execution of the script if value does not evaluate to true.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertTrue(value: boolean, message?: string): boolean;

/**
 * Aborts the execution of the script if value does not evaluate to false.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertFalse(value: boolean, message?: string): boolean;

/**
 * Aborts the execution of the script if the actual value is not equal to the expected value.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertEquals(
  expected: QVariant,
  actual: QVariant,
  message?: string
): boolean;

/**
 * Aborts the execution of the script if value is not null.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertNull(value: QVariant, message?: string): boolean;

/**
 * Aborts the execution of the script if value is null.
 * If message is provided an error is thrown with the given message, if not provided an error with default message is thrown.
 */
declare function assertNotNull(value: QVariant, message?: string): boolean;

/**
 * Call a D-Bus method at (service, path, interface and method). A variable number of arguments can be added.
 * The D-Bus call is always performed in an async way invoking the callback provided as the last (optional) argument.
 * The reply values of the D-Bus method call are passed to the callback.
 */
declare function callDBus(
  service: string,
  path: string,
  interfaceName: string,
  method: string,
  ...args: (QVariant | QScriptValue)[]
): void;

/**
 * Registers the passed in callback to be invoked whenever the User actions menu (Alt+F3 or right click on window decoration) is about to be shown.
 * The callback is invoked with a reference to the Client for which the menu is shown.
 */
declare function registerUserActionsMenu(callback: QScriptValue): void;
