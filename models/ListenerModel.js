const mongoose = require("mongoose");

const listenerSchema = new mongoose.Schema(
  {
    Measurements: {
      type: String,
      required: false,
    },
    Format: {
      type: String,
      required: false,
    },
    Identifier: {
      type: String,
      required: false,
    },
    MessageReason: {
      type: String,
      required: false,
    },
    EventDateTime: {
      type: Date,
      required: false,
    },
    PacketTimeStamp: {
      type: String,
      required: false,
    },
    Location: {
      NamedLocationType: {
        type: Number,
        required: false,
      },
      Named: {
        type: Boolean,
        required: false,
      },
      Interpolated: {
        type: Boolean,
        required: false,
      },
      GeoLocation: {
        Latitude: {
          type: Number,
          required: false,
        },
        Longitude: {
          type: Number,
          required: false,
        },
        Altitude: {
          type: Number,
          required: false,
        },
        GeodeticCell: {
          type: Array,
          required: false,
        },
        GeodeticFine: {
          type: String,
          required: false,
        },
      },
      NamedLocation: {
        type: String,
        required: false,
      },
      Address: {
        type: String,
        required: false,
      },
      CrossStreet: {
        type: String,
        required: false,
      },
      RegionTitle: {
        type: String,
        required: false,
      },
      RegionId: {
        type: String,
        required: false,
      },
    },
    UniqueId: {
      type: String,
      required: false,
    },
    LocationAgeMin: {
      type: String,
      required: false,
    },
    IgnitionState: {
      type: String,
      required: false,
    },
    Duration: {
      type: String,
      required: false,
    },
    Speed: {
      type: String,
      required: false,
    },
    DirectionAlpha: {
      type: String,
      required: false,
    },
    Odometer: {
      type: Number,
      required: false,
    },
    NumSatellites: {
      type: String,
      required: false,
    },
    IgnitionDuration: {
      type: Number,
      required: false,
    },
  },
  {
    timestamp: true,
    collection: "listener",
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Listener = mongoose.model("listener", listenerSchema);
module.exports = { Listener };
