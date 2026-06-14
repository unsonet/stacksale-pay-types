import { BusinessObject, DayOfWeek, Group, Hotel, LoggableNamedBusinessObject, NamedBusinessObject, PayableItem, PersistentObject, User } from "./common.interfaces";

export interface Category extends BusinessObject{
    name: String,
    description: String,
    showHeadings: Boolean,
    promotion: Promotion,
    questions: Array<Question>
}

export interface ConfiguredDates extends BusinessObject{
    tempId: String
}

export enum PricingMethod {
    perDay,
    perNight
}

export interface RangeLimitType{
    minimum: Date,
    maximum: Date
}

export enum SelectionType {
    arbitraryDates,
    dateRange
}

export interface DateQuestion extends Question{
    possibleDates: ConfiguredDates,
    basePrice: Map<DayOfWeek, number>,
    pricingMethod: PricingMethod,
    taxes: Array<TaxAmount>,
    selectMultiple: Map<RangeLimitType, number>,
    selectMultipleType: SelectionType,
    buyMultiple: Map<RangeLimitType, number>
}

export interface DateQuestionAnswer extends QuestionAnswer{
    dateQuestion: DateQuestion,
    answer: Map<Date, number>,
    chargedAmounts: Map<Date, number>,
    chargedTaxes: Map<Tax, number>
}

export enum ComparisonType {
    empty,
    notEmpty,
    equalTo,
    notEqualTo,
    lessThan,
    greaterThan,
    inList,
    notInList,
    contains,
    doesNotContain,
    matches
}

export interface DisplayCriteria extends BusinessObject{
    comparisonQuestion: Question,
    comparisonType: ComparisonType,
    comparisonValue: String
}

export interface DisplayTemplate extends NamedBusinessObject{
    hotel: Hotel,
    departments: Set<Group>,
    filename: String
}

export interface LongTextQuestion extends Question{}

export interface LongTextQuestionAnswer extends QuestionAnswer{
    longTextQuestion: LongTextQuestion,
    answer: String
}

export enum DisplayMethod {
    expandedList,
    dropdownMenu
}

export interface MultiChoiceQuestion extends Question{
    options: Array<MultiChoiceQuestionOption>,
    displayMethod: DisplayMethod,
    taxes: Array<TaxAmount>,
    selectMultiple: Boolean,
    buyMultiple: Map<RangeLimitType, number>,
    pricingDependsOn: Question,
    pricingDependencyMethod: PricingMethod
}

export interface MultiChoiceQuestionAnswer extends QuestionAnswer{
    multiChoiceQuestion: MultiChoiceQuestion,
    answer: Map<MultiChoiceQuestionOption, number>,
    chargedAmounts: Map<MultiChoiceQuestionOption, number>,
    chargedTaxes: Map<Tax, number>
}

export interface MultiChoiceQuestionOption extends BusinessObject{
    title: String,
    description: String,
    cost: number
}

export interface Promotion extends LoggableNamedBusinessObject{
    hotel: Hotel,
    name: String,
    department: Group,
    displayTemplate: DisplayTemplate,
    promotionDates: ConfiguredDates,
    maxAttendeesPerDate: Number,
    taxes: Array<TaxAmount>,
    promotionText: String,
    contactName: String,
    contactEmail: String,
    contactPhone: String,
    footerText: String,
    notifyEmails: Set<String>,
    activeDateRange: RangeLimitType,
    customCSS: String,
    categories: Array<Category>,
    uuid: String,
    enabled: Boolean,
    createdBy: User,
    promotionResponses: Array<PromotionResponse>
}

export interface PromotionResponse extends PayableItem{
    promotion: Promotion,
    chargedBasePrice: number,
    chargedBasePriceTaxes: Map<Tax, number>,
    questionAnswers: Array<QuestionAnswer>
}

export interface Question extends BusinessObject{
    title: String,
    description: String,
    showHeadings: Boolean,
    category: Category,
    mandatory: Boolean,
    displayCriteria: DisplayCriteria,
    tempId: String
}

export interface QuestionAnswer extends BusinessObject{
    promotionResponse: PromotionResponse
}

export enum RecurrencePeriod {
    days,
    weeks,
    months,
    years
}

export interface RecurringDates extends ConfiguredDates{
    firstDates: Array<Date>,
    lastDate: Date,
    recurrencePeriod: RecurrencePeriod,
    recurrenceInterval: number
}

export enum ContentType {
    text,
    emailAddress,
    phoneNumber,
    value
}

export interface ShortTextQuestion extends Question{
    contentType: ContentType,
    validationRegex: String
}

export interface ShortTextQuestionAnswer extends QuestionAnswer {
    shortTextQuestion: ShortTextQuestion,
    answer: String
}

export interface StaticDates extends ConfiguredDates{
    dates: Array<Date>
}

export interface StaticDatesWithPricing extends ConfiguredDates {
    dates: Map<Date, number>
}

export enum TaxType {
    percentage,
    fixed,
    perUnit
}

export interface Tax extends NamedBusinessObject{
    taxType: TaxType
}

export interface TaxAmount extends PersistentObject{
    tax: Tax
    amount: number
}

/*CUSTOM*/
export enum QuestionTypes {
    multiChoiceQuestion,
    dateQuestion,
    shortTextQuestion,
    longTextQuestion
}
/*END CUSTOM*/
