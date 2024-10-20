import { model, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    index: true,
    default: () => {
      return Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});
ticketSchema.plugin(mongoosePaginate);
export const TicketModel = model('Ticket', ticketSchema);