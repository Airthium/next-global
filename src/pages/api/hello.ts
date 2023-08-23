/**
 * Hello API
 * @param req Request
 * @param res Result
 */
const route = async (_req: Request, res: any): Promise<void> => {
  // BUG HERE
  // myvar is defined using next 13.4.12, but not using 13.4.13 ... 13.4.20-canary.2
  console.log(myvar)
  res.send('success')
}

export default route
