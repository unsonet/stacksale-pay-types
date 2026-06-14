/*promotions*/

// export interface MultiChoiceQuestionOption{
//     options:Array<{
//         id?:number|String,
//         tempID?:number|String,
//         quantity:number,
//         cost:number,
//         totalCost:number,
//         selected:Boolean,
//     }>
// }

/*end promotions*/

/*java.util*/
export type UUID = number
/*end java.util*/

/*java.base/java.time*/
export enum DayOfWeek{
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
/*end java.base/java.time*/

/*../constants*/
export enum MessageType {
    email,
    SMS,
    WhatsApp
}

export enum TransactionType {
    payment,
    preAuthorisation
}
/*end ../constants*/

/*generic*/
export interface LoggableNamedBusinessObject extends NamedBusinessObject{
    transientLogEntries:Array<LogEntry>;
}

export interface NamedBusinessObject extends BusinessObject {
    name:String
    description:String
}

export interface PersistentObject {
    id: number//BigInt,
    deleted: Boolean
}

export interface BusinessObject extends PersistentObject {
    hidden: Boolean,
    created: Date,
    lastModified: Date
}

export interface NamedBusinessObject extends BusinessObject {
    name: String,
    description: String
}
/*end generic*/

/*workflow*/
export enum WorkflowActionType {
    waitAction,
    delayAction,
    stopAction,
    sendCustomerEmailAction,
    sendHotelEmailAction,
    bookingSourceAction,
    payableItemAction,
    doNothingAction
}

export interface WorkflowAction extends NamedBusinessObject {
    type: WorkflowActionType
    configurationOptions: Set<ConfigurationOption>
}

export enum ConfigurationType {
    Boolean,
    Decimal,
    Integer,
    String
}

export interface ConfigurationOption extends NamedBusinessObject {
    displayName: String
    type: ConfigurationType
    workflowAction: WorkflowAction
}

export interface WorkflowConfigurationItem extends BusinessObject {
    hotels: Set<Hotel>
    configuredWorkflowAction: ConfiguredWorkflowAction
    configurationOption: ConfigurationOption
    configurationValue: String
    hotel: Hotel
}

export interface ConfiguredWorkflowAction extends NamedBusinessObject {
    workflowAction: WorkflowAction,
    workflowConfigurationItems: Set<WorkflowConfigurationItem>
}


export interface Workflow extends NamedBusinessObject {
    daysUntilServiceDate: number,
    configuredWorkflowActions: Array<ConfiguredWorkflowAction>,
    enabled: Boolean,
    applicableDates: Array<Date>,
}
/*end workflow*/

/*other*/
export interface Email extends BusinessObject {
    uuid: UUID,
    //emailAddresses: EmailAddresses,
    emailAddresses: any,
    serializedEmailAddresses: String,
    subject: String,
    textContent: String,
    htmlContent: String,
    //smsMessages: Array<SmsMessage>,
    smsMessages: Array<any>,
    //whatsAppMessages: Array<WhatsAppMessage>,
    whatsAppMessages: Array<any>,
    bounced: Boolean,
    attachments: Array<String>
}

export enum CustomerEmailType {
    paymentRequest,
    preAuthRequest,
    transactionResult,
    other
}
export interface CustomerEmail extends Email {
    payableItems: Set<PayableItem>
    emailType: CustomerEmailType;
    paymentLinkClicks: Map<Date, MessageType>
}

export enum TwoFactorAuthMethod {
    ipAddress,
    oneTimePassword
}

export enum CreationMethod {
    bookingScan,
    bookingLookup,
    manual,
    api,
    byPayee,
    upload
}

export interface PayableItem {
    hotel: Hotel
    uuid: UUID
    shortUuid: String
    firstName: String
    lastName: String
    phone: String
    email: String
    preferredLanguage: String
    currency: String
    transactionTypeExpected: TransactionType
    creationMethod: CreationMethod
    paid: Boolean
    workflow: Workflow
    assignedConfiguredWorkflowActions: Array<any>
    customerEmails: Array<CustomerEmail>
    //hotelEmails: Array<HotelEmail>
    hotelEmails: Array<any>
    //purchase: Purchase
    purchase: any
    cancelledDate: Date
    cancelledReason: String
    attachments: Array<String>
    //payableItemImport: PayableItemImport
    payableItemImport: any
}

export interface Hotel {
    hotelCode: String
    //city: City
    city: any
    validLoginSubnets: String
    //bookingMessageSources: Set<BookingMessageSource>
    bookingMessageSources: Set<any>
    groups: Set<Group>
    contactFirstName: String
    contactLastName: String
    contactEmailAddress: String
    timezone: String
    //hotelSettings: HotelSettings
    hotelSettings: any
    //functionalityActive: Map<Functionality, Boolean>
    functionalityActive: Map<any, Boolean>
    //paymentProcessors: Array<PaymentProcessorInstance>
    paymentProcessors: Array<any>
    //purchases: Array<Purchase>
    purchases: Array<any>
    websiteUrl: String
    //dailyStatistics: Array<DailyStatistic>
    dailyStatistics: Array<any>
    onPageMessages: Array<OnPageMessage>
    //longStayRoomTypes: Array<RoomType>
    longStayRoomTypes: Array<any>
    //longStayEventTypes: Array<EventType>
    longStayEventTypes: Array<any>
    //resolverService: ResolverService
    resolverService: any
}

export interface LogEntry {
    ipAddress: String
    user: User
    hotel: Hotel
    timestamp: Date
    //logLevel: LogLevel
    logLevel: any
    entry: String
    additionalInformation: String
    //entityLogEntries: Array<EntityLogEntry>
    entityLogEntries: Array<any>
}

export enum OnPageMessageType {
    information,
    alert
}

export enum HideDuration {
    never,
    session,
    permanent
}

export interface OnPageMessage extends BusinessObject {
    hotels: Set<Hotel>
    groups: Set<Group>
    users: Set<User>
    type: OnPageMessageType
    title: String
    message: String
    visibleFrom: Date
    visibleUntil: Date
    urlMatch: String
    hideDuration: HideDuration
    enabled: Boolean
}

/*end other*/

/*security*/

export interface Authority extends NamedBusinessObject { }

export interface Group extends NamedBusinessObject {
    hotel: Hotel
    contactName: String
    contactPhone: String
    contactEmailAddress: String
    users: Array<User>
    authorities: Set<Authority>
    department: Boolean
    canBeEmailContact: Boolean
    onPageMessages: Array<OnPageMessage>
}

export interface Password {
    password: String,
    created: Date
}

export enum UserConfiguration {
    canBccOtherDepts
}

export interface User {
    groups: Set<Group>
    username: String
    passwords: Array<Password>
    firstName: String
    lastName: String
    emailAddress: String
    phone: String
    userConfiguration: Map<UserConfiguration, Boolean>
    lastSuccessfulLogin: Date
    twoFactorAuthMethods: Array<TwoFactorAuthMethod>
    enabled: Boolean
    locked: Boolean
    credentialsExpired: Boolean
    oneTimePassword: String
    oneTimePasswordExpiry: Date
    loginFailureCount: number
    created: Date
    onPageMessages: Array<OnPageMessage>
    //passwordEncoder: PasswordEncoder
    passwordEncoder: any
}
/*end security*/