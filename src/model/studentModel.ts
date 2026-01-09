export interface studentModel{
    name:string,
	regNum: string,
	batchStart:string,
	batchEnd:string,
	DateOfJoin: Date,
	Course: string,
	FatherName: string,
	Address: string,
	PhonePrimary: string,
	PhoneSecondary?: string,
	dob:Date,
	HighestQualification: string,
	Email: string,
	Fees: Number
	isCertified: boolean,
	isCompleted:boolean,
	isDeleted:boolean,
	isFeesPending: boolean,
    isActive: boolean
}